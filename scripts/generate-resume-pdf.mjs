// Automated résumé PDF export.
//
// Drives headless Chrome (your installed Google Chrome, via playwright-core's
// `channel: "chrome"` - no browser download) over the `/cv` page, which renders
// the print-optimized CV (forced light mode, A4 zoom, per-page gradient frame,
// no Download button).
//
// Headless Chrome's page.pdf() embeds images losslessly at high resolution and
// leaves the /Info dictionary almost empty (only /Title). Post-processing:
//   - qpdf recompresses streams and images WITHOUT touching the text-showing
//     operators. NEVER Ghostscript: `gs -sDEVICE=pdfwrite` rewrites the whole
//     document and silently destroys the text layer (glyphs drop from the start
//     of words) - invisible on screen, only extraction reveals it.
//   - heavy PNGs are quantized on the wire via Playwright request interception
//     (page.route), so source assets on disk are never degraded.
//   - /Info (/Author, /Creator… which Chrome leaves empty) is stamped via a qpdf
//     JSON round-trip, from the <meta> tags read back off the rendered page.
//
// Usage:
//   npm run resume:pdf                    # A4, scale 1, qpdf pass
//   npm run resume:pdf -- --scale=0.9     # global scale (0.1–2)
//   npm run resume:pdf -- --optimize=none # skip the qpdf pass
//   npm run resume:pdf -- --margin=8mm --format=A4 --out=public/foo.pdf
//   npm run resume:pdf -- --url=http://localhost:1337  # reuse a running dev server
//
// Output overwrites the file served by the site's Download button.

import { Buffer } from "node:buffer";
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
const margin = args.margin ?? "0mm";
// Post-processing pass: "qpdf" (default) or "none". See optimizeWithQpdf below
// for why this is not Ghostscript. Whatever you change here, verify the text
// layer afterwards - a broken one is invisible to the eye:
//   pdftotext public/…-resume.pdf - | head -40
const quality = args.optimize ?? args.quality ?? "qpdf";
const VALID_QUALITY = ["qpdf", "none"];
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
    child.on("exit", (code) => reject(new Error(`Dev server exited early (code ${code})`)));
  });

  const stop = () => {
    try {
      if (child.pid) process.kill(-child.pid); // kill the whole process group
    } catch {
      /* already gone */
    }
  };
  return { baseUrl, stop };
}

/**
 * Quantize a PNG buffer with pngquant (palette, 8-bit). Resolves to `null` if
 * pngquant is missing or refuses the file, so callers fall back to the original.
 */
function quantizePng(buffer) {
  return new Promise((resolve) => {
    const p = spawn("pngquant", ["--quality=60-85", "--speed=1", "-"], {
      stdio: ["pipe", "pipe", "ignore"],
    });
    const chunks = [];
    p.stdout.on("data", (c) => chunks.push(c));
    p.on("error", () => resolve(null));
    p.on("close", (code) => resolve(code === 0 && chunks.length ? Buffer.concat(chunks) : null));
    p.stdin.on("error", () => resolve(null));
    p.stdin.end(buffer);
  });
}

/**
 * Serve heavy PNGs quantized *to the browser only* - the files on disk are
 * never touched, so the site keeps its full-quality assets. Chrome embeds
 * bitmaps losslessly, so the portrait alone was ~240 KB of the PDF; palette-
 * quantizing it is visually free on a greyscale photo and halves it.
 */
async function routeQuantizedImages(page) {
  const cache = new Map();
  await page.route("**/*.png", async (route) => {
    const file = path.join(
      root,
      "public",
      decodeURIComponent(new URL(route.request().url()).pathname),
    );
    // Small icons are already tiny; the round-trip would cost more than it saves.
    if (!fs.existsSync(file) || fs.statSync(file).size < 100_000) {
      return route.fallback();
    }
    if (!cache.has(file)) cache.set(file, await quantizePng(fs.readFileSync(file)));
    const body = cache.get(file);
    return body ? route.fulfill({ contentType: "image/png", body }) : route.fallback();
  });
}

/** Run qpdf with the given args; resolves to the exit code (3 = warnings only). */
function runQpdf(args) {
  return new Promise((resolve) => {
    const p = spawn("qpdf", args, { stdio: ["ignore", "ignore", "ignore"] });
    p.on("error", () => resolve(-1));
    p.on("close", (code) => resolve(code ?? -1));
  });
}

/**
 * Fill the PDF's /Info dictionary. Chrome only writes /Title (from <head>), so
 * /Author is empty - and a parser that trusts metadata over layout then has no
 * name at all, or takes the first line of the page ("Lead Front-End
 * Developer.") for one. This is the PDF's only structured-metadata channel;
 * JSON-LD is an HTML mechanism and has no equivalent here.
 *
 * `meta` is scraped off the rendered page rather than duplicated here, so the
 * strings live once in `src/consts.tsx`. A plain Node script cannot import that
 * TSX module, and the `<head>` is the natural hand-off point.
 */
async function stampMetadata(file, meta) {
  const json = `${file}.meta.json`;
  if ((await runQpdf([file, "--json-output", "--json-key=qpdf", json])) < 0) {
    return false;
  }
  try {
    const doc = JSON.parse(fs.readFileSync(json, "utf8"));
    const objects = doc.qpdf?.[1] ?? {};
    let patched = false;
    // qpdf's JSON encodes strings with a "u:" (unicode) prefix.
    const str = (v) => (v ? `u:${v}` : undefined);
    for (const obj of Object.values(objects)) {
      if (obj?.value && typeof obj.value === "object" && obj.value["/Producer"]) {
        for (const [key, value] of Object.entries({
          "/Author": str(meta.author),
          "/Creator": str(meta.author),
          "/Subject": str(meta.subject),
          "/Keywords": str(meta.keywords),
        })) {
          if (value) obj.value[key] = value;
        }
        patched = true;
      }
    }
    if (!patched) return false;
    fs.writeFileSync(json, JSON.stringify(doc));
    const stamped = `${file}.stamped.pdf`;
    const code = await runQpdf([file, `--update-from-json=${json}`, stamped]);
    if (code !== 0 && code !== 3) return false;
    fs.renameSync(stamped, file);
    return true;
  } catch {
    return false;
  } finally {
    fs.rmSync(json, { force: true });
  }
}

/**
 * Shrink the raw PDF with qpdf; returns true if optimized.
 *
 * NOT Ghostscript. `gs -sDEVICE=pdfwrite` rewrites the whole document, text
 * included, and mangles the text layer: characters drop out of the start of
 * words ("Simpler" → "er", "Contributing" → "ibuting"). The page still *looks*
 * perfect, so the damage is invisible until an ATS or an LLM reads the file -
 * and it then silently loses keywords. qpdf recompresses streams and images
 * without touching the text-showing operators, so extraction stays exact.
 *
 * Reference numbers on this CV: raw 991 KB · qpdf 624 KB · gs 431 KB but broken.
 * To go further, shrink the source images (the portrait alone is ~240 KB of it,
 * lossless PNG because of its alpha channel) rather than the generated PDF.
 */
function optimizeWithQpdf(rawPath, outPath) {
  if (quality === "none") {
    fs.renameSync(rawPath, outPath);
    return false;
  }
  const qpdf = spawn(
    "qpdf",
    [
      "--optimize-images",
      "--object-streams=generate",
      "--recompress-flate",
      "--compression-level=9",
      rawPath,
      outPath,
    ],
    { stdio: "inherit" },
  );
  return new Promise((resolve) => {
    qpdf.on("error", (err) => {
      // qpdf missing/unrunnable → keep the raw file as the output.
      console.warn(
        `[resume:pdf] qpdf unavailable (${err.code || err.message}); ` +
          `keeping unoptimized PDF. Install it with: brew install qpdf`,
      );
      fs.renameSync(rawPath, outPath);
      resolve(false);
    });
    qpdf.on("exit", (code) => {
      // 3 = warnings only, output still written and valid.
      if ((code === 0 || code === 3) && fs.existsSync(outPath)) {
        fs.rmSync(rawPath, { force: true });
        resolve(true);
      } else {
        console.warn(`[resume:pdf] qpdf exited with code ${code}; keeping unoptimized PDF.`);
        fs.renameSync(rawPath, outPath);
        resolve(false);
      }
    });
  });
}

// --- Generate -------------------------------------------------------------
async function main() {
  if (!VALID_QUALITY.includes(quality)) {
    throw new Error(`Invalid --optimize=${quality}. Use one of: ${VALID_QUALITY.join(", ")}`);
  }
  const before = fs.existsSync(out) ? fs.statSync(out).size : 0;
  const raw = out.replace(/\.pdf$/, ".raw.pdf");
  console.log(`[resume:pdf] scale=${scale} format=${format} margin=${margin} optimize=${quality}`);

  const { baseUrl, stop } = await startServer();
  let browser;
  let pageMeta = {};
  try {
    browser = await chromium.launch({ channel: "chrome" });
    const context = await browser.newContext({ colorScheme: "light" });
    const page = await context.newPage();
    await page.emulateMedia({ media: "print" });
    if (quality !== "none") await routeQuantizedImages(page);

    const target = `${baseUrl}/cv`;
    console.log(`[resume:pdf] rendering ${target}`);
    await page.goto(target, { waitUntil: "networkidle", timeout: 60_000 });
    // Confirm we are in PDF mode (Download button removed, body text rendered).
    await page.waitForFunction(
      () => !document.querySelector("a[download]") && document.body.innerText.length > 500,
      { timeout: 30_000 },
    );
    // Ensure every image is fully loaded AND decoded before snapshotting -
    // networkidle alone can fire before small icons finish decoding, leaving
    // them blank in the PDF (they still show fine in a live browser).
    await page.evaluate(() =>
      Promise.all(
        Array.from(document.images).map((img) =>
          img.complete && img.naturalWidth > 0
            ? img.decode().catch(() => {})
            : new Promise((resolve) => {
                img.addEventListener("load", () => resolve(), { once: true });
                img.addEventListener("error", () => resolve(), { once: true });
              }),
        ),
      ),
    );

    // Last one wins: the route's <head> overrides the root layout's defaults.
    pageMeta = await page.evaluate(() => {
      const content = (name) =>
        [...document.querySelectorAll(`meta[name="${name}"]`)]
          .map((m) => m.getAttribute("content"))
          .filter(Boolean)
          .pop() ?? undefined;
      return {
        author: content("author"),
        subject: content("subject"),
        keywords: content("keywords"),
      };
    });

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
  const optimized = await optimizeWithQpdf(raw, out);
  if (!(await stampMetadata(out, pageMeta))) {
    console.warn("[resume:pdf] could not stamp /Author & /Keywords metadata.");
  }
  const after = fs.statSync(out).size;
  const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
  console.log(
    `[resume:pdf] wrote ${path.relative(root, out)} - ${kb(after)}` +
      (optimized ? ` (raw ${kb(rawSize)} → ${quality})` : "") +
      (before ? ` (previous ${kb(before)})` : ""),
  );
}

main().catch((err) => {
  console.error("[resume:pdf] failed:", err.message);
  process.exit(1);
});
