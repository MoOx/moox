// Visual regression guard for refactors that must not change the render.
//
// The site's visual result is its main asset, so any structural refactor (the
// DOM/styling plan in HTML-STYLING-PROPOSAL.md) needs a check stronger than
// "it still looks fine". This captures full-page screenshots of every route at
// a phone and a desktop width, and diffs them pixel by pixel against a
// previously captured baseline.
//
// Usage:
//   node scripts/visual-diff.mjs --save=before   # on the base commit
//   node scripts/visual-diff.mjs --save=after    # after the change
//   node scripts/visual-diff.mjs --diff=before,after
//
//   --url=…       server to shoot (default http://localhost:1337, i.e. `npm run dev`)
//   --paths=a,b   routes to capture (default: the list below)
//   --widths=…    viewport widths (default 390,1280)
//   --dir=…       where baselines live (default .visual/)
//
// Reading the output: a differing height means the layout moved, which is
// always a regression, and the only thing that sets a non-zero exit code.
// A non-zero pixel count at identical height is informational - two runs of
// the *same* build sit at 0.000-0.003%, so anything in that range is noise.
//
// Known blind spot: pages with a `Parallax` section (`/blog`, `/talks`) can
// differ by ~10% between two builds while being provably unchanged. Chromium
// stitches a fullPage screenshot by scrolling, the parallax transform follows
// the scroll, and where it lands depends on when lazy images settled. When
// that happens, do not trust the pixel count - measure instead: load the page
// at scroll 0 in both builds and compare `getBoundingClientRect()` of the
// elements in the region that differs. Identical geometry, identical layout.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, v] = a.replace(/^--/, "").split("=");
      return [k, v ?? "true"];
    }),
);

const baseUrl = args.url ?? "http://localhost:1337";
const outRoot = path.join(root, args.dir ?? ".visual");
const widths = (args.widths ?? "390,1280").split(",").map(Number);
// `/design-system` earns its place: it renders every HTML primitive and the
// code samples, and a refactor once dedented content inside its template
// literals with nothing to catch it, because it was not in this list.
const paths = (
  args.paths ??
  "/,/resume,/contact,/talks,/blog,/cv,/design-system,/fr,/fr/resume,/fr/contact,/fr/cv"
).split(",");

const shotName = (p, width) => `${p === "/" ? "home" : p.replace(/\//g, "_")}-${width}.png`;

// Above this, the comparison is not telling you about a refactor any more.
const ABSURD_PCT = 50;

// A laptop has Google Chrome, which is what the PDF export drives; a container
// (CI, an agent sandbox) usually has a Chromium binary and no Chrome at all.
// Take whichever is actually there rather than assuming, since a wrong guess
// here means the whole harness refuses to start.
const BUNDLED_CHROMIUM = "/opt/pw-browsers/chromium";
const launch = () => {
  const explicit = process.env.CHROMIUM_PATH;
  if (explicit) {
    return chromium.launch({ executablePath: explicit, args: ["--no-sandbox"] });
  }
  if (fs.existsSync(BUNDLED_CHROMIUM)) {
    return chromium.launch({ executablePath: BUNDLED_CHROMIUM, args: ["--no-sandbox"] });
  }
  return chromium.launch({ channel: "chrome" });
};

async function capture(label) {
  const dir = path.join(outRoot, label);
  fs.mkdirSync(dir, { recursive: true });
  const browser = await launch();
  for (const width of widths) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      // Animations would make every run differ from the last.
      reducedMotion: "reduce",
    });
    for (const p of paths) {
      const page = await ctx.newPage();
      const res = await page.goto(baseUrl + p, { waitUntil: "networkidle" });
      if (!res?.ok()) {
        console.warn(`  skip ${p} (${res?.status()})`);
        await page.close();
        continue;
      }
      // Walk the page so lazy images and in-view animations settle, then come
      // back to the top.
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1200);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(600);
      // Pin the sticky header before the full-page capture. Chromium stitches
      // a fullPage screenshot by scrolling, so a `position: sticky` element
      // lands wherever the scroll happened to leave it - which shifted the
      // whole page by a few pixels between runs and made every diff useless.
      // Dropping it back into the flow is deterministic, and the point here is
      // to catch layout moves, not to photograph the header mid-scroll.
      await page.evaluate(() => {
        for (const el of document.querySelectorAll("*")) {
          if (getComputedStyle(el).position === "sticky") el.style.position = "relative";
        }
      });
      await page.waitForTimeout(200);
      await page.screenshot({ path: path.join(dir, shotName(p, width)), fullPage: true });
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  console.log(`captured → ${path.relative(root, dir)}`);
}

async function diff(a, b) {
  const dirA = path.join(outRoot, a);
  const dirB = path.join(outRoot, b);
  const browser = await launch();
  const page = await browser.newPage();
  await page.goto("about:blank");
  let failed = 0;
  for (const name of fs.readdirSync(dirB).sort()) {
    const fileA = path.join(dirA, name);
    if (!fs.existsSync(fileA)) {
      console.log(`${name.padEnd(24)} no baseline`);
      continue;
    }
    const res = await page.evaluate(
      async ([x, y]) => {
        // `onerror` matters: without it a truncated or corrupt baseline never
        // settles the promise and the run hangs with no output at all.
        const load = (d) =>
          new Promise((resolve, reject) => {
            const i = new Image();
            i.onload = () => resolve(i);
            i.onerror = () => reject(new Error("PNG could not be decoded"));
            i.src = "data:image/png;base64," + d;
          });
        let ia, ib;
        try {
          [ia, ib] = await Promise.all([load(x), load(y)]);
        } catch (e) {
          return { failed: String(e.message ?? e) };
        }
        if (ia.width !== ib.width || ia.height !== ib.height) {
          return { moved: true, a: `${ia.width}x${ia.height}`, b: `${ib.width}x${ib.height}` };
        }
        const pixels = (img) => {
          const c = document.createElement("canvas");
          c.width = img.width;
          c.height = img.height;
          const x2 = c.getContext("2d", { willReadFrequently: true });
          if (!x2) throw new Error("no 2d canvas context — cannot diff");
          x2.drawImage(img, 0, 0);
          return x2.getImageData(0, 0, img.width, img.height).data;
        };
        const da = pixels(ia);
        const db = pixels(ib);
        let n = 0;
        let worst = { y: -1, n: 0 };
        for (let row = 0; row < ia.height; row++) {
          let inRow = 0;
          for (let col = 0; col < ia.width; col++) {
            const i = (row * ia.width + col) * 4;
            if (
              Math.abs(da[i] - db[i]) > 8 ||
              Math.abs(da[i + 1] - db[i + 1]) > 8 ||
              Math.abs(da[i + 2] - db[i + 2]) > 8
            )
              inRow++;
          }
          n += inRow;
          if (inRow > worst.n) worst = { y: row, n: inRow };
        }
        return {
          moved: false,
          size: `${ia.width}x${ia.height}`,
          n,
          pct: (n / (ia.width * ia.height)) * 100,
          worst,
        };
      },
      [
        fs.readFileSync(fileA).toString("base64"),
        fs.readFileSync(path.join(dirB, name)).toString("base64"),
      ],
    );
    if (res.failed) {
      failed++;
      console.log(`${name.padEnd(24)} UNREADABLE  ${res.failed}`);
    } else if (res.moved) {
      failed++;
      console.log(`${name.padEnd(24)} LAYOUT MOVED  ${res.a} → ${res.b}`);
    } else if (res.pct > ABSURD_PCT) {
      // A truncated PNG still decodes in Chromium — it just comes out mostly
      // blank, which reads as a ~100% diff rather than a decode error. Nothing
      // legitimate lands here: run-to-run noise is 0.003%, and the worst honest
      // artifact (parallax, see above) is 11%.
      failed++;
      console.log(
        `${name.padEnd(24)} ${res.size}  ${res.pct.toFixed(1)}% differs — corrupt baseline, or a change far too large to be a refactor`,
      );
    } else if (res.n > 0) {
      console.log(
        `${name.padEnd(24)} ${res.size}  ${res.n} px (${res.pct.toFixed(3)}%)  worst row y=${res.worst.y}`,
      );
    } else {
      console.log(`${name.padEnd(24)} ${res.size}  identical`);
    }
  }
  await browser.close();
  if (failed) {
    console.error(
      `\n${failed} page(s) changed height or could not be read — check before merging.`,
    );
    process.exitCode = 1;
  }
}

if (args.save) {
  await capture(args.save);
} else if (args.diff) {
  const [a, b] = args.diff.split(",");
  await diff(a, b);
} else {
  console.error("usage: --save=<label> | --diff=<labelA>,<labelB>");
  process.exitCode = 1;
}
