/**
 * The app landing pages, assembled at build time from the apps' own
 * repositories.
 *
 *   npm run apps
 *
 * Every app listed in `content/apps.json` publishes the same trio, and this
 * reads it:
 *
 *   marketing/listing.json   the store copy, in every language the stores have
 *   marketing/privacy.md     the privacy policy
 *   index.json (press kit)   the screenshots, and where they are served from
 *
 * Nothing here is copied into this repository by hand. The page is a template
 * over that trio (`src/app/apps.$slug.tsx`), so publishing a second app is
 * adding a line to `content/apps.json`.
 *
 * **This exits non-zero rather than emit a partial page.** The URL is what the
 * two stores were given as the app's privacy policy, and a page that answers
 * with a hero and no policy is a review rejection, not a degraded page. Same
 * for the store links: a landing page nobody can install the app from is not
 * worth shipping either.
 *
 * Output, all of it generated and none of it committed (see .gitignore):
 *
 *   public/content/apps/<slug>.json    the page's data
 *   public/content/apps/<slug>/…       the icon and the screenshots
 */
import fs from "node:fs";
import path from "node:path";
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

const isNode = (node) => typeof node === "object" && node !== null;
const childrenOf = (node) =>
  node.children === undefined ? [] : Array.isArray(node.children) ? node.children : [node.children];

/**
 * The policy, ready to sit inside the page rather than be the page.
 *
 * Its own `<h1>` becomes the section heading rendered by the route (with the
 * `#privacy` anchor the stores were given), so it is dropped here and every
 * heading below it moves down one level: the page's `<h1>` is the app name,
 * and a document with two of them has no outline left. The anchor links
 * `rehype-autolink-headings` prepends go too - they carry no text, and the
 * renderer drops the `aria-hidden` that made them invisible to a reader.
 */
function policyBody(body) {
  const children = childrenOf(body);
  const titleIndex = children.findIndex((child) => isNode(child) && /^h[1-6]$/.test(child.tag));
  const rest = titleIndex === -1 ? children : children.slice(titleIndex + 1);
  return { ...body, children: rest.map(demoteHeading) };
}

function demoteHeading(node) {
  if (!isNode(node) || typeof node.tag !== "string") return node;
  const level = node.tag.match(/^h([1-5])$/);
  if (!level) return node;
  return {
    ...node,
    tag: `h${Number(level[1]) + 1}`,
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
      "Each step names its capture per platform, e.g. \"image\": { \"ios\": \"ios/01-editor.jpg\" }.",
    );
  }
  return platform;
}

/** A per-language block, in the page's language, English then whatever exists. */
const pickLocale = (byLocale, locale) =>
  byLocale[locale] ?? localePreference.map((code) => byLocale[code]).find(Boolean) ??
  Object.values(byLocale)[0];

async function download(url, to, what) {
  const buffer = await getBuffer(url, what);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.writeFileSync(to, buffer);
  return { bytes: buffer.length, ...imageSize(buffer) };
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
  fs.rmSync(assetsDir, { recursive: true, force: true });

  const iconPath = manifest.icon ?? "icon.png";
  const icon = await download(
    `${base}/${iconPath}`,
    path.join(assetsDir, iconPath),
    `${app.slug} icon`,
  );

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
    const size = await download(
      `${base}/${imagePath}`,
      path.join(assetsDir, imagePath),
      `${app.slug} screenshot ${imagePath}`,
    );
    steps.push({
      ...rest,
      image: {
        src: `/content/apps/${app.slug}/${imagePath}`,
        width: size.width,
        height: size.height,
      },
    });
  }

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
    privacy: { title: privacy.title ?? "Privacy", body: policyBody(privacy.body) },
  };

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `${app.slug}.json`), JSON.stringify(page));

  const shotCount = steps.filter((step) => step.image).length;
  console.log(
    `Generated ${path.join("public", "content", "apps", app.slug + ".json")}` +
      ` (${locale}, ${steps.length} story steps, ${shotCount} ${platform} shots,` +
      ` ${page.description.length} paragraphs)`,
  );
}

if (!fs.existsSync(registryPath)) fail(`No app registry at ${registryPath}.`);
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
for (const app of registry.apps ?? []) {
  await build(app);
}
