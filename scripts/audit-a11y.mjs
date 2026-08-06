// Accessibility + semantics audit of the visible site.
//
// Runs axe-core (WCAG 2 A/AA) over the pages a visitor actually reads, in both
// languages, and prints a structural summary next to it: an axe pass says
// nothing about whether the page has headings, landmarks or real lists, and
// that structure is what a crawler and an LLM read. Both halves matter.
//
// `/cv` is deliberately excluded: it exists to render the PDF, and its own
// constraints (per-character gradient spans, print layout) are out of scope -
// see CV-REWORK-JOURNAL.md §15 for what this audit found and fixed.
//
// Usage:
//   npm run a11y                                  # spawns a dev server
//   npm run a11y -- --url=http://localhost:1337   # reuse a running one
//   npm run a11y -- --json                        # machine-readable output

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, v] = a.replace(/^--/, "").split("=");
      return [k, v ?? "true"];
    }),
);

const PATHS = ["/", "/resume", "/contact"];
const LANGS = ["", "/fr"];
const SCHEMES = ["light", "dark"];
const port = Number(args.port ?? "4320");

async function startServer() {
  if (args.url) return { baseUrl: args.url.replace(/\/$/, ""), stop: () => {} };
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
  return {
    baseUrl,
    stop: () => {
      try {
        if (child.pid) process.kill(-child.pid);
      } catch {
        /* already gone */
      }
    },
  };
}

/** Counts what axe cannot: the elements a crawler reads the page structure from. */
const structureProbe = () => {
  const q = (s) => Array.from(document.querySelectorAll(s));
  const headings = q("h1,h2,h3,h4,h5,h6");
  return {
    landmarks: {
      header: q("header").length,
      nav: q("nav").length,
      main: q("main").length,
      footer: q("footer").length,
      section: q("section").length,
      article: q("article").length,
    },
    lists: {
      ul: q("ul").length,
      ol: q("ol").length,
      li: q("li").length,
      // A listitem whose parent is not the list is an ARIA error axe reports
      // as critical - easy to introduce by tagging items and forgetting the
      // wrapper, or by a component that renders its own container in between.
      orphanListItems: q("li").filter((li) => !/^(UL|OL)$/.test(li.parentElement?.tagName ?? ""))
        .length,
    },
    paragraphs: q("p").length,
    divs: q("div").length,
    headings: headings.map((h) => ({
      level: Number(h.tagName[1]),
      text: h.textContent.trim().replace(/\s+/g, " ").slice(0, 60),
      hidden: h.getClientRects().length === 0,
      empty: h.textContent.trim() === "",
    })),
    // A link whose name lives on a child element has no accessible name at all.
    linksWithoutName: q("a[href]").filter(
      (a) => !a.textContent.trim() && !a.getAttribute("aria-label") && !a.getAttribute("title"),
    ).length,
    emptyAnchors: q("a:not([href])").length,
  };
};

/** Structural problems that axe does not report but a crawler trips on. */
function structureFindings(s) {
  const out = [];
  const visible = s.headings.filter((h) => !h.hidden);
  const h1s = visible.filter((h) => h.level === 1);
  if (h1s.length === 0) out.push("no h1 on the page");
  if (h1s.length > 1) out.push(`${h1s.length} visible h1`);
  const allH1 = s.headings.filter((h) => h.level === 1);
  if (allH1.length > 1) out.push(`${allH1.length} h1 in the HTML (incl. CSS-hidden)`);
  const empty = s.headings.filter((h) => h.empty).length;
  if (empty) out.push(`${empty} empty heading(s)`);
  let previous = 0;
  for (const h of visible) {
    if (previous && h.level > previous + 1) {
      out.push(`heading level jumps h${previous} → h${h.level} ("${h.text}")`);
      break;
    }
    previous = h.level;
  }
  if (s.landmarks.nav === 0) out.push("no <nav> landmark");
  // Only pages that actually have several top-level blocks need sectioning:
  // a single-heading page is one region already, and inventing <section>s
  // there adds landmarks a screen-reader user has to skip past.
  const h2s = s.headings.filter((h) => h.level === 2 && !h.hidden).length;
  if (s.landmarks.section === 0 && h2s > 1) {
    out.push("no <section> — no title/content association");
  }
  if (s.lists.ul + s.lists.ol === 0) out.push("no real list markup");
  const orphanItems = s.lists.orphanListItems ?? 0;
  if (orphanItems) out.push(`${orphanItems} <li> outside a list`);
  if (s.linksWithoutName) out.push(`${s.linksWithoutName} link(s) without an accessible name`);
  if (s.emptyAnchors) out.push(`${s.emptyAnchors} empty <a> (scroll anchors)`);
  return out;
}

async function main() {
  const { baseUrl, stop } = await startServer();
  const axeSource = fs.readFileSync(path.join(root, "node_modules/axe-core/axe.min.js"), "utf8");
  const results = [];
  let browser;
  try {
    browser = await chromium.launch({ channel: "chrome" });
    const page = await browser.newPage();
    // Both themes: the palette is not the same in dark mode, so a contrast
    // check that only ever runs light audits half the site.
    for (const scheme of SCHEMES) {
      await page.emulateMedia({ colorScheme: scheme });
      for (const lang of LANGS) {
        for (const p of PATHS) {
          const url = `${baseUrl}${lang}${p === "/" && lang ? "" : p}`;
          await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
          await page.addScriptTag({ content: axeSource });
          const axe = await page.evaluate(async () => {
            // @ts-ignore - injected above
            const r = await window.axe.run(document, {
              runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
            });
            return r.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              help: v.help,
              nodes: v.nodes.length,
              // A few real offenders: a count says "fix something", a selector
              // says which component to open.
              samples: v.nodes.slice(0, 3).map((n) => ({
                target: String(n.target[0]).slice(0, 90),
                summary: (n.failureSummary ?? "").split("\n").slice(1, 3).join(" ").slice(0, 150),
              })),
            }));
          });
          const structure = await page.evaluate(structureProbe);
          results.push({
            url: (url.replace(baseUrl, "") || "/") + ` [${scheme}]`,
            scheme,
            axe,
            structure,
          });
        }
      }
    }
  } finally {
    if (browser) await browser.close();
    stop();
  }

  if (args.json) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  let violations = 0;
  for (const r of results) {
    console.log(`\n══ ${r.url}`);
    if (r.axe.length === 0) console.log("  axe: no WCAG 2 A/AA violation");
    for (const v of r.axe) {
      violations += v.nodes;
      console.log(`  axe [${v.impact}] ${v.id} — ${v.help} (${v.nodes} node(s))`);
      if (args.verbose) {
        for (const s of v.samples) console.log(`         ↳ ${s.target}\n           ${s.summary}`);
      }
    }
    const findings = structureFindings(r.structure);
    for (const f of findings) console.log(`  structure: ${f}`);
    const { landmarks, lists, divs } = r.structure;
    console.log(
      `  counts: ${divs} div · section ${landmarks.section} · nav ${landmarks.nav} · ` +
        `article ${landmarks.article} · ul ${lists.ul} · li ${lists.li}`,
    );
  }
  console.log(`\n${violations} axe violation node(s) across ${results.length} pages.`);
}

main().catch((err) => {
  console.error("[a11y] failed:", err.message);
  process.exit(1);
});
