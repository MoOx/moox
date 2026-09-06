// Guard against SSR HTML that references CSS it does not carry.
//
// react-native-web compiles a registered style into an atomic class, and the
// rule behind that class only exists once the style has been registered.
// `__root.tsx` serializes that registry from the last node of <body>, so by
// then it holds everything the page rendered. Move that node earlier and the
// styles registered after it are lost: the markup ships the class, the
// stylesheet does not ship the rule, and the page paints without it until
// hydration puts it back.
//
// The registry is a module global, so the second request to a given process
// already finds it warm. That is why this is invisible in day-to-day `npm run
// dev`, and why every route here gets a *fresh server*: on a cold worker any
// route can be the first one served.
//
// Usage:
//   node scripts/audit-ssr-css.mjs
//   node scripts/audit-ssr-css.mjs --paths=/,/resume   # narrow it down
//   node scripts/audit-ssr-css.mjs --jobs=1            # serialize (debugging)
//
// A failure lists the classes with no rule. It almost certainly means the
// stylesheet is being serialized too early - see the rule in `CLAUDE.md`.

import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

// One detail page per kind on top of the index routes: they render components
// no index does (`ResumeEntryDetailCard`, the markdown renderer), and a style
// registered during *their* render is just as invisible.
const paths = (
  args.paths ??
  "/,/resume,/contact,/talks,/blog,/cv,/design-system,/fr,/fr/resume,/fr/contact,/fr/cv," +
    "/resume/1985-hello-world,/blog/about-simplicity,/talks/a-static-website-with-react-really," +
    "/apps/hide-the-notch"
).split(",");
const jobs = Number(args.jobs ?? 3);
const firstPort = Number(args.port ?? 6100);

// react-native-web's sheet is served as a React style resource, so it is
// identified by `data-href` and carries no id (see `__root.tsx`).
const RNW_STYLE_SELECTOR = 'data-href="react-native-stylesheet"';
const RULES_STYLE_SELECTOR = 'id="react-multiversal--css-rules"';

const styleContent = (html, attribute) => {
  const match = html.match(new RegExp(`<style[^>]*${attribute}[^>]*>([\\s\\S]*?)</style>`));
  return match ? match[1] : "";
};

/**
 * Only the generated families are checked. Hand-written classes (`.userColor
 * Scheme-auto`, the theme root) come from real stylesheets that ship as files,
 * and `$tsr` is the router's own marker.
 */
const isGenerated = (className) => /^(r|css)-/.test(className);

const audit = (html) => {
  const missing = [];

  const rnwRules = styleContent(html, RNW_STYLE_SELECTOR);
  const declared = new Set([...rnwRules.matchAll(/\.([\w-]+)/g)].map((m) => m[1]));
  const used = new Set();
  for (const m of html.matchAll(/class="([^"]*)"/g)) {
    m[1].split(/\s+/).forEach((c) => c && used.add(c));
  }
  for (const className of used) {
    if (isGenerated(className) && !declared.has(className)) {
      missing.push({ kind: "react-native-web class", value: className });
    }
  }

  const ownRules = styleContent(html, RULES_STYLE_SELECTOR);
  const responsive = new Set();
  for (const m of html.matchAll(/data-rs="([^"]*)"/g)) {
    m[1].split(/\s+/).forEach((id) => id && responsive.add(id));
  }
  for (const id of responsive) {
    if (!ownRules.includes(`[data-rs~="${id}"]`)) {
      missing.push({ kind: "responsiveStyle id", value: id });
    }
  }

  return missing;
};

/**
 * Readiness has to be established without rendering anything, or the audit
 * warms the very registry it is trying to catch cold. A 404 does not qualify:
 * it renders the root route's `notFoundComponent`, which brings the whole
 * shell - header, menu bar, footer - and registers their styles. That is
 * exactly how the menu bar's off-scale padding slipped through this script.
 *
 * A file from `public/` is served by the static middleware and touches no
 * React at all.
 */
const READINESS_URL = "/favicon-32x32.png";

const waitForServer = async (port, child) => {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`vite exited with ${child.exitCode}`);
    try {
      const response = await fetch(`http://localhost:${port}${READINESS_URL}`);
      if (response.ok) {
        await response.arrayBuffer();
        return;
      }
    } catch {
      // not listening yet
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`server on ${port} never came up`);
};

const auditPath = async (routePath, port) => {
  const child = spawn("npx", ["vite", "dev", "--port", String(port)], {
    cwd: root,
    stdio: ["ignore", "ignore", "pipe"],
  });
  let stderr = "";
  child.stderr.on("data", (d) => (stderr += d));
  try {
    await waitForServer(port, child);
    const response = await fetch(`http://localhost:${port}${routePath}`);
    const html = await response.text();
    if (!response.ok) throw new Error(`${routePath} answered ${response.status}`);
    return { routePath, missing: audit(html) };
  } catch (error) {
    return { routePath, error: error.message, stderr: stderr.slice(-2000) };
  } finally {
    child.kill("SIGTERM");
  }
};

const queue = paths.map((p, i) => ({ routePath: p, port: firstPort + i }));
const results = [];
const workers = Array.from({ length: Math.min(jobs, queue.length) }, async () => {
  for (;;) {
    const next = queue.shift();
    if (!next) return;
    const result = await auditPath(next.routePath, next.port);
    results.push(result);
    const label = result.error
      ? `ERROR ${result.error}`
      : result.missing.length === 0
        ? "ok"
        : `${result.missing.length} missing`;
    console.log(`${result.routePath.padEnd(16)} ${label}`);
  }
});
await Promise.all(workers);

const failures = results.filter((r) => r.error || r.missing.length > 0);
if (failures.length === 0) {
  console.log(`\nEvery class and id in the served HTML has a rule. (${paths.length} routes)`);
  process.exit(0);
}

console.log("");
for (const failure of failures.sort((a, b) => a.routePath.localeCompare(b.routePath))) {
  if (failure.error) {
    console.log(`${failure.routePath}: could not audit - ${failure.error}`);
    if (failure.stderr) console.log(failure.stderr);
    continue;
  }
  console.log(`${failure.routePath}: ${failure.missing.length} without a rule`);
  for (const { kind, value } of failure.missing) console.log(`  ${kind}: ${value}`);
}
console.log(
  "\nThese classes are in the served HTML with no rule behind them." +
    "\nThe stylesheet is most likely serialized before they are registered.",
);
process.exit(1);
