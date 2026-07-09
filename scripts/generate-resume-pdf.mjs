// Automated résumé PDF export.
//
// Drives headless Chrome (your installed Google Chrome, via playwright-core's
// `channel: "chrome"` — no browser download) over the `/resume?pdf=true` page,
// which the app renders in "PDF mode" (no header/footer, no Download button,
// solid-color headings, full English text per entry, no decorative blocks).
//
// Headless Chrome's page.pdf() embeds images losslessly at high resolution
// (~2.7 MB here), unlike the browser's "Save as PDF" which recompresses to
// JPEG. So we post-process with Ghostscript (downsample + JPEG) to get the
// rich look at ~500 KB while keeping the text vectorial/selectable (bot- and
// AI-readable). If Ghostscript is missing, the raw PDF is kept as-is.
//
// Usage:
//   npm run resume:pdf                    # A4, scale 1, quality ebook (150dpi)
//   npm run resume:pdf -- --scale=0.9     # global scale (0.1–2)
//   npm run resume:pdf -- --quality=screen  # screen|ebook|printer|prepress|none
//   npm run resume:pdf -- --margin=8mm --format=A4 --out=public/foo.pdf
//   npm run resume:pdf -- --url=http://localhost:1337  # reuse a running dev server
//
// Output overwrites the file served by the site's Download button.

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// --- CLI args -------------------------------------------------------------
const args = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, v] = a.replace(/^--/, "").split("=");
      return [k, v ?? "true"];
    }),
);

const scale = Math.min(2, Math.max(0.1, Number(args.scale ?? "1")));
const format = args.format ?? "A4";
const margin = args.margin ?? "10mm";
// Ghostscript image-compression preset ("none" disables optimization).
const quality = args.quality ?? "printer";
const VALID_QUALITY = ["screen", "ebook", "printer", "prepress", "none"];
const out = path.resolve(
  root,
  args.out ?? "public/maxime-thirouin-freelance-front-end-developer-resume.pdf",
);
const port = Number(args.port ?? "4319");
const externalUrl = args.url; // if set, don't spawn a dev server

// --- Dev server (renders PDF mode server-side) ----------------------------
/** @returns {Promise<{ baseUrl: string, stop: () => void }>} */
async function startServer() {
  if (externalUrl) {
    return { baseUrl: externalUrl.replace(/\/$/, ""), stop: () => {} };
  }
  const bin = path.join(root, "node_modules", ".bin", "vite");
  const child = spawn(bin, ["dev", "--port", String(port)], {
    cwd: root,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  const baseUrl = await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Dev server did not start within 90s")),
      90_000,
    );
    let buf = "";
    const onData = (d) => {
      buf += d.toString();
      const m = buf.match(/http:\/\/localhost:(\d+)/);
      if (m && /ready in/.test(buf)) {
        clearTimeout(timeout);
        resolve(`http://localhost:${m[1]}`);
      }
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("exit", (code) =>
      reject(new Error(`Dev server exited early (code ${code})`)),
    );
  });

  const stop = () => {
    try {
      process.kill(-child.pid); // kill the whole process group
    } catch {
      /* already gone */
    }
  };
  return { baseUrl, stop };
}

/** Compress the raw PDF's images with Ghostscript; returns true if optimized. */
function optimizeWithGhostscript(rawPath, outPath) {
  if (quality === "none") {
    fs.renameSync(rawPath, outPath);
    return false;
  }
  const gs = spawn(
    "gs",
    [
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.7",
      `-dPDFSETTINGS=/${quality}`,
      "-dDetectDuplicateImages=true",
      "-dNOPAUSE",
      "-dBATCH",
      "-dQUIET",
      `-sOutputFile=${outPath}`,
      rawPath,
    ],
    { stdio: "inherit" },
  );
  return new Promise((resolve) => {
    gs.on("error", (err) => {
      // Ghostscript missing/unrunnable → keep the raw file as the output.
      console.warn(
        `[resume:pdf] Ghostscript unavailable (${err.code || err.message}); ` +
          `keeping unoptimized PDF. Install it with: brew install ghostscript`,
      );
      fs.renameSync(rawPath, outPath);
      resolve(false);
    });
    gs.on("exit", (code) => {
      if (code === 0 && fs.existsSync(outPath)) {
        fs.rmSync(rawPath, { force: true });
        resolve(true);
      } else {
        console.warn(
          `[resume:pdf] Ghostscript exited with code ${code}; keeping unoptimized PDF.`,
        );
        fs.renameSync(rawPath, outPath);
        resolve(false);
      }
    });
  });
}

// --- Generate -------------------------------------------------------------
async function main() {
  if (!VALID_QUALITY.includes(quality)) {
    throw new Error(
      `Invalid --quality=${quality}. Use one of: ${VALID_QUALITY.join(", ")}`,
    );
  }
  const before = fs.existsSync(out) ? fs.statSync(out).size : 0;
  const raw = out.replace(/\.pdf$/, ".raw.pdf");
  console.log(
    `[resume:pdf] scale=${scale} format=${format} margin=${margin} quality=${quality}`,
  );

  const { baseUrl, stop } = await startServer();
  let browser;
  try {
    browser = await chromium.launch({ channel: "chrome" });
    const context = await browser.newContext({ colorScheme: "light" });
    const page = await context.newPage();
    await page.emulateMedia({ media: "print" });

    const target = `${baseUrl}/resume?pdf=true`;
    console.log(`[resume:pdf] rendering ${target}`);
    await page.goto(target, { waitUntil: "networkidle", timeout: 60_000 });
    // Confirm we are in PDF mode (Download button removed, body text rendered).
    await page.waitForFunction(
      () =>
        !document.querySelector("a[download]") &&
        document.body.innerText.length > 500,
      { timeout: 30_000 },
    );

    await page.pdf({
      path: raw,
      format,
      scale,
      printBackground: true,
      margin: { top: margin, right: margin, bottom: margin, left: margin },
    });
  } finally {
    if (browser) await browser.close();
    stop();
  }

  const rawSize = fs.statSync(raw).size;
  const optimized = await optimizeWithGhostscript(raw, out);
  const after = fs.statSync(out).size;
  const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
  console.log(
    `[resume:pdf] wrote ${path.relative(root, out)} — ${kb(after)}` +
      (optimized ? ` (raw ${kb(rawSize)} → /${quality})` : "") +
      (before ? ` (previous ${kb(before)})` : ""),
  );
}

main().catch((err) => {
  console.error("[resume:pdf] failed:", err.message);
  process.exit(1);
});
