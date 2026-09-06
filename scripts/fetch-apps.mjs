/**
 * The app landing pages, assembled from the apps' own repositories.
 *
 *   npm run apps
 *
 * Every app listed in `content/apps.json` publishes the same trio, and this
 * reads it:
 *
 *   marketing/listing.json   the store copy in every language the stores have
 *   marketing/privacy.md     the privacy policy
 *   index.json (press-kit)   the deck, as data: the screenshots, and the words
 *                            each of them was composed to carry
 *
 * The third one is what shapes the page. A store deck is a sequence - one
 * screen, one sentence, in an order somebody chose - and its `story` is that
 * sequence with the text still text instead of burned into a picture. The page
 * rebuilds it in HTML, so the same words are selectable, translatable and
 * readable aloud, and lays out one block per step.
 *
 * **This exits non-zero rather than emit a partial page.** The URL is what the
 * two stores were given as the app's privacy policy, and a page that answers
 * with a hero and no policy is a review rejection, not a degraded page. Same
 * for the store links: a landing page nobody can install the app from is not
 * worth shipping either.
 *
 * **What it writes is committed**, unlike the rest of `public/content`. The
 * press-kit branch is force-pushed on every run of the app's own tooling, so
 * without a copy in here the site would build from whatever that branch says
 * today and nobody would see the difference in a diff. Committing it means the
 * page's words and pictures are reviewed like anything else, and that a build
 * is reproducible. Re-running is idempotent: an asset whose bytes upstream are
 * unchanged is left exactly as it is, so a rebuild does not churn the repo.
 *
 * Output, under `public/content/apps/`:
 *
 *   index.json          one summary per app, for `/apps`
 *   <slug>.json         the page's data
 *   <slug>/…            the icon and the screenshots
 */
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { markdownAsJsTree } = require("@moox/markdown-to-json");

const root = process.cwd();
const registryPath = path.join(root, "content", "apps.json");
const outDir = path.join(root, "public", "content", "apps");

/** The page is English. The stores' locale for it, then the plain code. */
const localePreference = ["en-US", "en-GB", "en"];

/**
 * One device tells the story; the press kit ships three. A phone is what the
 * deck was composed for and what most visitors arrive on, so it wins, and the
 * others are only there so an app that ships no phone captures still has a
 * page.
 */
const platformPreference = ["ios", "iphone", "phone", "android", "ipad", "tablet"];

/** What each press-kit platform folder is called, for the alt texts. */
const platformLabels = {
  ios: "iPhone",
  iphone: "iPhone",
  ipad: "iPad",
  android: "Android",
};

/**
 * The page draws its phone 280px wide, so twice that is what a retina screen
 * asks for and everything past it is bytes nobody sees. The press kit ships
 * 720px because a press kit cannot know what it will be laid out in; these are
 * committed, so the difference is repository weight and not only bandwidth.
 */
const captureWidth = 560;
const captureQuality = 0.82;

function fail(message, hint) {
  console.error(`\n  ${message}\n`);
  if (hint) console.error(`  ${hint}\n`);
  process.exit(1);
}

async function get(url, what) {
  let res;
  try {
    res = await fetch(url);
  } catch (error) {
    fail(`Could not reach the ${what}: ${url}`, error.message);
  }
  if (!res.ok) fail(`The ${what} answered ${res.status}: ${url}`);
  return res;
}

const getText = async (url, what) => (await get(url, what)).text();

const getJson = async (url, what) => {
  const body = await getText(url, what);
  try {
    return JSON.parse(body);
  } catch (error) {
    return fail(`The ${what} is not valid JSON: ${url}`, error.message);
  }
};

const getBuffer = async (url, what) => Buffer.from(await (await get(url, what)).arrayBuffer());

/**
 * A manifest field that names one of the other two files, if it names one at
 * all: an older press kit put the privacy policy's *text* under that key
 * rather than its URL, and fetching a Markdown document is a confusing way to
 * fail.
 */
const asUrl = (value) => (typeof value === "string" && /^https?:\/\//.test(value) ? value : null);

const sha = (buffer) => createHash("sha256").update(buffer).digest("hex").slice(0, 16);

/**
 * Width and height straight out of the file, so every `<img>` reserves its
 * box before it loads. The screenshots are the tallest thing on the page;
 * without this the whole page jumps once per image.
 */
function imageSize(buffer) {
  // PNG: IHDR is mandated to be the first chunk, at a fixed offset.
  if (buffer.length > 24 && buffer.readUInt32BE(0) === 0x89504e47) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  // JPEG: walk the segments to the first frame header, which carries them.
  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buffer.length) {
      if (buffer[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buffer[i + 1];
      // Padding, and the standalone markers that carry no length after them.
      if (marker === 0xff || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
        i += 2;
        continue;
      }
      // SOF0…SOF15, minus the three markers in that range that are not frames.
      const isFrameHeader =
        marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isFrameHeader) {
        return { height: buffer.readUInt16BE(i + 5), width: buffer.readUInt16BE(i + 7) };
      }
      i += 2 + buffer.readUInt16BE(i + 2);
    }
  }
  return {};
}

/**
 * Downscaling and re-encoding, through the browser this repository already
 * drives for the PDF and for the screenshot harness rather than a new
 * dependency. Best effort by design: no Chromium, or a file it will not
 * decode, and the press kit's own JPEG is committed unchanged - a heavier
 * page, never a missing one.
 */
/** @type {Promise<import("playwright-core").Browser | null> | undefined} */
let browserPromise;
async function encodeJpeg(buffer) {
  browserPromise ??= (async () => {
    const { chromium } = await import("playwright-core");
    const bundled = "/opt/pw-browsers/chromium";
    const executablePath = process.env.CHROMIUM_PATH ?? (fs.existsSync(bundled) ? bundled : null);
    return executablePath
      ? chromium.launch({ executablePath, args: ["--no-sandbox"] })
      : chromium.launch({ channel: "chrome" });
  })().catch(() => null);

  const browser = await browserPromise;
  if (!browser) return null;
  const page = await browser.newPage();
  try {
    const base64 = await page.evaluate(
      async ({ bytes, width, quality }) => {
        const bitmap = await createImageBitmap(new Blob([new Uint8Array(bytes)]));
        const scale = Math.min(1, width / bitmap.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(bitmap.width * scale);
        canvas.height = Math.round(bitmap.height * scale);
        const context = canvas.getContext("2d");
        context.imageSmoothingQuality = "high";
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        const url = canvas.toDataURL("image/jpeg", quality);
        return url.startsWith("data:image/jpeg") ? url.slice(url.indexOf(",") + 1) : null;
      },
      { bytes: [...buffer], width: captureWidth, quality: captureQuality },
    );
    return base64 ? Buffer.from(base64, "base64") : null;
  } catch {
    return null;
  } finally {
    await page.close();
  }
}

const isNode = (node) => typeof node === "object" && node !== null;
const childrenOf = (node) =>
  node.children === undefined ? [] : Array.isArray(node.children) ? node.children : [node.children];

/**
 * The policy, ready to be a page of its own.
 *
 * Its own `<h1>` becomes that page's heading, rendered by the route, so it is
 * dropped here rather than repeated; every level below it is kept as authored,
 * which is what makes the page read h1 then h2 and not h1 then h3. The anchor
 * links `rehype-autolink-headings` prepends go too - they carry no text, and
 * the renderer drops the `aria-hidden` that made them invisible to a reader.
 */
function policyBody(body) {
  const children = childrenOf(body);
  const titleIndex = children.findIndex((child) => isNode(child) && /^h[1-6]$/.test(child.tag));
  const rest = titleIndex === -1 ? children : children.slice(titleIndex + 1);
  return { ...body, children: rest.map(withoutAnchorLink) };
}

/** The policy's opening paragraph, as plain text: the page links to the whole. */
function policySummary(body) {
  const paragraph = childrenOf(body).find((child) => isNode(child) && child.tag === "p");
  if (!paragraph) return undefined;
  const text = (node) =>
    typeof node === "string" ? node : isNode(node) ? childrenOf(node).map(text).join("") : "";
  return text(paragraph).replace(/\s+/g, " ").trim() || undefined;
}

function withoutAnchorLink(node) {
  if (!isNode(node) || !/^h[1-6]$/.test(node.tag ?? "")) return node;
  return {
    ...node,
    children: childrenOf(node).filter(
      (child) => !(isNode(child) && child.tag === "a" && child.props?.["aria-hidden"]),
    ),
  };
}

/** The store links, wherever the app publishes them - but only from the app. */
function storeLinks(app, manifest, listing) {
  const urls = { ...listing.urls, ...manifest.urls, ...manifest.stores };
  const appStore = urls.appStore;
  const play = urls.play;
  if (!appStore || !play) {
    fail(
      `${app.slug}: no store links published by ${app.repo}.`,
      "They are the one thing on the page that is neither copy nor picture, and\n" +
        "  they still belong to the app, not to this site. Add them to the `urls`\n" +
        "  block that marketing/listing.json already has (or to the press kit's\n" +
        "  index.json, which wins over it):\n\n" +
        '      "appStore": "https://apps.apple.com/app/idXXXXXXXXXX",\n' +
        '      "play": "https://play.google.com/store/apps/details?id=…"',
    );
  }
  return { appStore, play };
}

/** A per-language block, in the page's language, English then whatever exists. */
const pickLocale = (byLocale, locale) =>
  byLocale[locale] ??
  localePreference.map((code) => byLocale[code]).find(Boolean) ??
  Object.values(byLocale)[0];

/**
 * The deck, as the page renders it: one step per block, in the order the deck
 * put them, with the copy resolved to one language and the headline split on
 * the newlines the deck composed it with. A step with no image is a step the
 * deck drew rather than photographed (the closing card), and it keeps its
 * place in the sequence.
 */
function storySteps(story, locale, platform, slug) {
  return story.map((step, index) => {
    const copy = pickLocale(step.copy ?? {}, locale) ?? {};
    if (!copy.headline) {
      fail(
        `${slug}: story step ${step.id ?? index} has no headline in any language.`,
        "Every step of the deck carries a line; a block with a picture and no words is not one.",
      );
    }
    return {
      id: step.id ?? String(index),
      headline: String(copy.headline).split("\n"),
      sub: copy.sub,
      // The paragraph the deck has no room for and a web page does.
      body: copy.body,
      line: copy.line,
      note: copy.note,
      imagePath: step.image?.[platform],
    };
  });
}

/** The one this manifest's story is best told with. */
function storyPlatform(story, slug, pressKitUrl) {
  const available = new Set(story.flatMap((step) => Object.keys(step.image ?? {})));
  const platform = platformPreference.find((name) => available.has(name)) ?? [...available][0];
  if (!platform) {
    fail(
      `${slug}: the story in ${pressKitUrl} has no screenshots.`,
      'Each step names its capture per platform, e.g. "image": { "ios": "ios/01-editor.jpg" }.',
    );
  }
  return platform;
}

/**
 * One asset, fetched and rewritten only if it actually changed.
 *
 * `known` is what the last run recorded for this file, so a byte-identical
 * upstream leaves the committed copy untouched - which is what keeps a rebuild
 * out of the diff, the re-encoding included: two runs of the same encoder are
 * not guaranteed to agree to the byte, and this output is committed.
 */
async function keepAsset({ url, to, what, known, recompress }) {
  const source = await getBuffer(url, what);
  const hash = sha(source);
  if (known?.sha === hash && fs.existsSync(to)) return known;
  const encoded = recompress ? await encodeJpeg(source) : null;
  const buffer = encoded && encoded.length < source.length ? encoded : source;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.writeFileSync(to, buffer);
  return { sha: hash, bytes: buffer.length, ...imageSize(buffer) };
}

/** What the previous run wrote, keyed by the file it wrote it to. */
function knownAssets(slug) {
  const known = new Map();
  const file = path.join(outDir, `${slug}.json`);
  if (!fs.existsSync(file)) return known;
  try {
    const previous = JSON.parse(fs.readFileSync(file, "utf8"));
    const images = [previous.icon, ...(previous.story ?? []).map((step) => step.image)];
    for (const image of images) {
      if (image?.src && image.sha) known.set(path.join(root, "public", image.src), image);
    }
  } catch {
    // A file this run is about to replace anyway.
  }
  return known;
}

/** Everything under the app's folder that this run did not write. */
function pruneAssets(assetsDir, kept) {
  if (!fs.existsSync(assetsDir)) return 0;
  let removed = 0;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        if (fs.readdirSync(full).length === 0) fs.rmdirSync(full);
      } else if (!kept.has(full)) {
        fs.rmSync(full);
        removed++;
      }
    }
  };
  walk(assetsDir);
  return removed;
}

/** Writing only a real change, so a rebuild leaves the working tree clean. */
function writeIfChanged(file, content) {
  if (fs.existsSync(file) && fs.readFileSync(file, "utf8") === content) return false;
  fs.writeFileSync(file, content);
  return true;
}

async function build(app) {
  const raw = `https://raw.githubusercontent.com/${app.repo}`;
  const pressKitUrl = `${raw}/${app.pressKit}/index.json`;
  const manifest = await getJson(pressKitUrl, `${app.slug} press kit`);

  // The manifest names the two other files itself; the registry's `ref` is the
  // fallback for the older manifests that do not.
  const listingUrl = asUrl(manifest.listing) ?? `${raw}/${app.ref}/marketing/listing.json`;
  const privacyUrl = asUrl(manifest.privacy) ?? `${raw}/${app.ref}/marketing/privacy.md`;
  const base = (asUrl(manifest.base) ?? `${raw}/${app.pressKit}`).replace(/\/$/, "");

  const listing = await getJson(listingUrl, `${app.slug} listing`);
  const privacyMd = await getText(privacyUrl, `${app.slug} privacy policy`);

  const locales = listing.locales ?? {};
  const locale = localePreference.find((code) => locales[code]) ?? Object.keys(locales)[0];
  if (!locale) fail(`${app.slug}: no locale in ${listingUrl}`);
  const copy = locales[locale];

  // Checked before anything is downloaded: this is the one thing the trio may
  // not carry yet, and half a megabyte of screenshots is a slow way to find out.
  const stores = storeLinks(app, manifest, listing);

  const privacy = markdownAsJsTree(privacyMd);
  if (!privacy.body || childrenOf(privacy.body).length === 0) {
    fail(
      `${app.slug}: the privacy policy at ${privacyUrl} is empty.`,
      "This URL is the one the stores were given. An empty policy is a rejection.",
    );
  }

  const story = manifest.story ?? [];
  if (story.length === 0) {
    fail(
      `${app.slug}: the press kit at ${pressKitUrl} has no story.`,
      "The page is built from the deck, not from a list of files: `story` is that\n" +
        "  deck as data - one entry per step, each with its `image` per platform and\n" +
        "  its `copy` per language. `npm run press-kit` in the app writes it.",
    );
  }
  const extras = pickLocale(manifest.extras ?? {}, locale) ?? {};

  const assetsDir = path.join(outDir, app.slug);
  const known = knownAssets(app.slug);
  const written = new Set();

  const iconPath = manifest.icon ?? "icon.png";
  const iconFile = path.join(assetsDir, iconPath);
  written.add(iconFile);
  const icon = await keepAsset({
    url: `${base}/${iconPath}`,
    to: iconFile,
    what: `${app.slug} icon`,
    known: known.get(iconFile),
  });

  // Only the device the page shows is downloaded: the press kit carries three
  // sets of the same screens, and two of them would be megabytes nothing reads.
  const platform = storyPlatform(story, app.slug, pressKitUrl);
  const steps = [];
  for (const step of storySteps(story, locale, platform, app.slug)) {
    const { imagePath, ...rest } = step;
    if (!imagePath) {
      steps.push(rest);
      continue;
    }
    const file = path.join(assetsDir, imagePath);
    written.add(file);
    const image = await keepAsset({
      url: `${base}/${imagePath}`,
      to: file,
      what: `${app.slug} screenshot ${imagePath}`,
      known: known.get(file),
      recompress: true,
    });
    steps.push({ ...rest, image: { src: `/content/apps/${app.slug}/${imagePath}`, ...image } });
  }
  const pruned = pruneAssets(assetsDir, written);

  const page = {
    slug: app.slug,
    repoUrl: `https://github.com/${app.repo}`,
    generated: manifest.generated,
    locale,
    name: copy.name,
    subtitle: copy.subtitle ?? "",
    short: copy.short ?? "",
    description: (copy.description ?? "")
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
    keywords: (copy.keywords ?? "")
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean),
    stores,
    icon: { src: `/content/apps/${app.slug}/${iconPath}`, ...icon },
    device: platformLabels[platform] ?? platform,
    story: steps,
    badges: extras.badges ?? [],
    privacy: {
      title: privacy.title ?? "Privacy",
      summary: policySummary(privacy.body),
      body: policyBody(privacy.body),
    },
  };

  fs.mkdirSync(outDir, { recursive: true });
  writeIfChanged(path.join(outDir, `${app.slug}.json`), JSON.stringify(page, null, 2) + "\n");

  const shots = steps.filter((step) => step.image);
  const bytes = [icon, ...shots.map((step) => step.image)].reduce(
    (total, image) => total + (image.bytes ?? 0),
    0,
  );
  console.log(
    `  ${app.slug}: ${steps.length} story steps, ${shots.length} ${platform} shots,` +
      ` ${page.description.length} paragraphs, ${(bytes / 1024).toFixed(0)} kB` +
      (pruned > 0 ? `, ${pruned} stale file(s) removed` : ""),
  );
  return page;
}

if (!fs.existsSync(registryPath)) fail(`No app registry at ${registryPath}.`);
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));

console.log("");
const pages = [];
for (const app of registry.apps ?? []) {
  pages.push(await build(app));
}

// What `/apps` needs and nothing more, so the index does not load a full page
// per card to render a card.
writeIfChanged(
  path.join(outDir, "index.json"),
  JSON.stringify(
    pages.map((page) => ({
      slug: page.slug,
      name: page.name,
      subtitle: page.subtitle,
      short: page.short,
      icon: page.icon,
      stores: page.stores,
      badges: page.badges,
      lead: page.story.find((step) => step.image),
    })),
    null,
    2,
  ) + "\n",
);
console.log("");

// The encoder's browser, if anything actually needed re-encoding.
const browser = await browserPromise;
if (browser) await browser.close();
