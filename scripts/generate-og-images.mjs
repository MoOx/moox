// Social-preview image export.
//
// Drives headless Chrome (your installed Google Chrome, via playwright-core's
// `channel: "chrome"`) over the `/og` route, which renders the home hero in a
// fixed frame, and screenshots that frame as JPEG. The route shares its
// components with the site, so the images carry whatever title, subtitle and
// gradients the site carries - no more hand-made JPEG advertising a retired
// title.
//
// One card per language, plus the README banner (English only, GitHub's
// proportions):
//   /og            → public/preview-1200x630.jpg
//   /fr/og         → public/preview-1200x630.fr.jpg
//   /og?format=github → github.jpg
// (same names as `socialImagePath` in src/profile.tsx - keep the two in sync.)
//
// Run locally and commit the result, like the PDF: the fonts are the ones
// Chrome finds on this Mac, which is what the site renders with.
//
// Usage:
//   npm run og                                 # everything
//   npm run og -- --lang=fr                    # one language, social card only
//   npm run og -- --url=http://localhost:1337  # reuse a running dev server
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { startDevServer } from "./lib/dev-server.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? "true"] : [a, "true"];
  }),
);

const LANGS = ["en", "fr"];
const langs = args.lang ? [args.lang] : LANGS;
const port = Number(args.port ?? "4320");
const externalUrl = args.url;
/** JPEG quality: the previous files were JPEGmini-optimized to ~120 KB. */
const quality = Number(args.quality ?? "88");

/** `/og` for the default language, `/fr/og` for the others (see src/i18n.ts). */
const pathFor = (lang) => (lang === "en" ? "/og" : `/${lang}/og`);

/** Everything to export: one social card per language, the banner in English. */
const targets = [
  ...langs.map((lang) => ({
    lang,
    format: "social",
    out: `public/preview-1200x630${lang === "en" ? "" : `.${lang}`}.jpg`,
  })),
  ...(langs.includes("en") ? [{ lang: "en", format: "github", out: "github.jpg" }] : []),
];

async function renderImage(browser, baseUrl, { lang, format, out }) {
  const outPath = path.resolve(root, out);
  const before = fs.existsSync(outPath) ? fs.statSync(outPath).size : 0;
  const context = await browser.newContext({
    colorScheme: "light",
    // Larger than any frame, so the page never scrolls or reflows the card.
    viewport: { width: 1800, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  try {
    const target = `${baseUrl}${pathFor(lang)}${format === "social" ? "" : `?format=${format}`}`;
    console.log(`[og] rendering ${target}`);
    await page.goto(target, { waitUntil: "networkidle", timeout: 60_000 });
    const frame = page.locator(`[data-og-frame="${format}"]`);
    await frame.waitFor({ timeout: 30_000 });
    // Fonts and the photo must be fully loaded and decoded before the shot:
    // networkidle can fire before a large PNG finishes decoding.
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images).map((img) =>
          img.complete && img.naturalWidth > 0
            ? img.decode().catch(() => {})
            : new Promise((resolve) => {
                img.addEventListener("load", () => resolve(), { once: true });
                img.addEventListener("error", () => resolve(), { once: true });
              }),
        ),
      );
    });
    // The availability dot pulses; let the animation settle on a full frame.
    await page.waitForTimeout(300);
    await frame.screenshot({ path: outPath, type: "jpeg", quality });
  } finally {
    await context.close();
  }
  return { before, after: fs.statSync(outPath).size };
}

async function main() {
  for (const lang of langs) {
    if (!LANGS.includes(lang)) {
      throw new Error(`Invalid --lang=${lang}. Use one of: ${LANGS.join(", ")}`);
    }
  }
  console.log(`[og] langs=${langs.join(",")} quality=${quality}`);
  const { baseUrl, stop } = await startDevServer({ root, port, externalUrl });
  let browser;
  const results = [];
  try {
    browser = await chromium.launch({ channel: "chrome" });
    for (const target of targets) {
      results.push({ ...target, ...(await renderImage(browser, baseUrl, target)) });
    }
  } finally {
    if (browser) await browser.close();
    stop();
  }
  const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
  for (const r of results) {
    console.log(`[og] wrote ${r.out} - ${kb(r.after)}` + (r.before ? ` (previous ${kb(r.before)})` : ""));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
