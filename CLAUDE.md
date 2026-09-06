# moox.io

Personal site + CV, in English and French. TanStack Start, React Native Web
(`react-multiversal`), content authored as markdown in `content/` and compiled
to JSON by `npm run markdown`.

## Where things are

| What                               | Where                                         |
| ---------------------------------- | --------------------------------------------- |
| The CV page (source of the PDFs)   | `src/app/{-$lang}.cv.tsx`                     |
| The web CV                         | `src/app/{-$lang}.resume.tsx` (+ `resume_.*`) |
| CV copy, figures, derivations      | `src/profile.tsx`                             |
| Missions / open source / education | `content/resume/*.md` frontmatter             |
| Testimonials                       | `src/components/BlockTestimonials.tsx`        |
| i18n contract (types, hooks, URLs) | `src/i18n.ts`                                 |
| PDF export (one file per language) | `scripts/generate-resume-pdf.mjs`             |
| App landing pages (`/apps/<slug>`) | `src/app/apps.$slug.tsx` + `AppLandingPage`   |
| Which apps, and from which repo    | `content/apps.json`                           |
| Fetching an app's copy & shots     | `scripts/fetch-apps.mjs` (`npm run apps`)     |

**Routes are file-based with an optional language segment**: `{-$lang}.cv.tsx`
serves both `/cv` and `/fr/cv` — one definition, two languages. English is the
default and carries no prefix. `/blog` and `/talks` are deliberately
English-only, which is why `localizedHref` only prefixes the paths listed in
`localizedPathPatterns`.

**`TODO.md` is the only place with open items.** Everything else is history or
contract — if a document grows a checkbox, it belongs there instead.

Longer context, only read when relevant:

- `TODO.md` — what is left to do, what is parked, what was dropped
- `CV-REWORK-JOURNAL.md` — everything that was wrong, changed, and why. §0–13
  the CV and its PDF pipeline, §14–15 the site pass (structure, i18n, a11y)
- `CONTENT-NORMALIZATION.md` — the frontmatter field contract (registers and
  the ladder; the types themselves are commented in `src/api.tsx`)
- `STATS.md` — the source and refresh command for every figure on the CV

## Rules that cost real damage when broken

**Never put Ghostscript back in the PDF pipeline.** `gs -sDEVICE=pdfwrite`
rewrites the whole document, text included, and silently destroys the text
layer — characters drop from the start of words (`Simpler` → `er`). The PDF
still _looks_ perfect, so nothing reveals it until an ATS or an LLM reads the
file. It shipped broken for months. Use qpdf (streams + images, text
untouched), plus pngquant served through Playwright request interception so
source assets are never degraded.

After **any** change to the export script, verify **both** files — text layer
_and_ page count (the CV is two pages, and French runs ~15% longer, which is
why it renders at `scale: 0.97`):

```sh
pdftotext public/maxime-thirouin-freelance-front-end-developer-resume.pdf - | head -40
pdftotext public/maxime-thirouin-freelance-front-end-developer-resume.fr.pdf - | head -40
pdfinfo public/maxime-thirouin-freelance-front-end-developer-resume.fr.pdf | grep Pages
```

**`<ReactNativeStyleSheet />` is the last child of `<body>`, with `href` and
`precedence` and no `id`. All three are load-bearing.** It serializes
react-native-web's registry, and the library only knows a class once the style
behind it is registered, so whatever has not been registered by the time this
component runs ships as a class with no rule. Rendering it **last** is what
makes the registry complete: it is the one-pass equivalent of the
[Server API](https://necolas.github.io/react-native-web/docs/rendering/), which
says to render the app first and read the sheet second. Move it back into
`<head>` and React reaches it before the `<body>` subtree, so every style a
component registers while rendering is lost, and the page paints unspaced until
hydration. That only shows on a **cold** server process, since the registry is
a module global the second request finds warm.

`href` + `precedence` make it a React _style resource_, which is what puts it
in `<head>` anyway however late it renders, and what keeps React from touching
it afterwards: a resource is deduped by `href` and never re-rendered. Without
them React rewrites the element each time it re-mounts the shell, once per
navigation; the browser then discards its `CSSStyleSheet` and builds a new one,
leaving react-native-web holding a detached sheet, so every style registered
from then on lands nowhere and a page reached by clicking a link loses spacing
the same page loaded directly has. None of this is new: it predates #125 and
only became visible once spacing moved from inline styles to classNames.

**As a resource React also drops the `id`, and an inline script has to put it
back.** `createCSSStyleSheet` adopts the element it finds under
`react-native-stylesheet` and otherwise builds its own **at `head.firstChild`**,
in front of the served sheet. Two sheets then carry the same atomic classes and
the cascade between them falls back to document order, so the `.css-view-*`
reset (`padding: 0`, `margin: 0`, in the _server's_ sheet) beats every atomic
class that exists only in the client's. Everything the client registers after
the served HTML, which is every rule a route pulls in on a client-side
navigation, is cancelled: `Container` loses its horizontal padding, and only
when the page is reached by clicking a link. `__root.tsx` renders a one-line
script next to the sheet that sets the `id` back from `data-href` before the
deferred module graph runs, and the client adopts the served sheet instead of
adding a second one.

That one hides behind a warm registry the same way: once the server has served
a few routes it holds nearly every rule, the served sheet is complete, and there
is nothing left for the client to add. It reproduces on a **cold** server, and
always in the prerendered build, where each page carries only its own rules.

`npm run audit:ssr-css` requests every route from a **fresh** server and fails
on a class with no rule. It would not have caught the sheet above: there the
served class does have a rule, and it is the client that overrides it. It exists
to catch a regression on the ordering, not as a
discipline to follow: nothing has to be pre-registered.

**Derive, never hand-write.** Every hand-authored value on this CV has drifted
at some point (date spans, teaching years, blog counts). Dates come from the
markdown via `group` / `groupPeriods` / `monthRange` (`src/profile.tsx`); counts come from the
generated JSON. If you find yourself typing a period or a total, look for the
derivation instead. Manual figures that genuinely cannot be computed live in
`profile.tsx` with a `STATS.md` reference.

**Flags, not positions.** Selection and grouping are expressed as named
frontmatter/data flags — `group`, `personal`, `highlight`, `feature`,
`cv` — never as `slice(0, n)` or index arithmetic.

**The job title is `Lead Front-End Developer`**, identical to the title of the
last three missions. That is deliberate: the headline must stay a summary of
the evidence below it, not a claim above it. Do not reintroduce "Architect".

**Numbers must be checkable.** Every figure on the CV either derives from the
content or is documented in `STATS.md` with the command to recompute it. Never
invent a plausible-looking metric.

**Translate at the boundary, not in the components.** A translatable value is
`Localized<T>` — a plain value (English, untranslated) or `{ en, fr }` — and
English is always the fallback. Résumé entries are resolved **once, in the
route loader** (`fetchResume(lang)`), so components keep reading plain strings;
only the editorial strings in TypeScript go through `useT()`. Anything
generated (meta tags, stats, dates, JSON-LD) takes a `lang` argument instead.
Never add a language check inside a rendering component.

**A French string is a hand-written value, so it drifts.** The French halves of
the markdown bodies were once a translation of a text that had since been
rewritten, and nothing surfaced it. When you change an English body, change the
French one in the same edit. To audit the whole set, compare word counts per
file: French normally runs 1.1–1.3× English; far outside that range means one
side moved without the other.

**Source SVGs in `svgs/` take no comments, and their ids must be plain
alphanumeric.** `npm run svg` inlines the file into JSX verbatim, so an XML
comment lands inside `return (…)` and breaks the build; and ids copied off a
rendered page carry React `useId` prefixes like `:r8:mask0_408_134`. Colons in
a fragment identifier are legal but hostile — anything in the chain that
sanitizes ids desynchronizes the `url(#…)` references from their defs, the
paint silently falls back to black, and you only see it in the exported PDF
(`nextjs.svg` rendered as a plain black disc). Name ids after the file:
`nextjsMask`, `nextjsPaint0`. Watch for cross-file collisions too — several
SVGs still define `url(#a)` / `url(#b)`, which resolve to whichever comes first
in the document if two of them ever render on the same page.

**An app landing page is never written here, and the build fails rather than
serve half of one.** `/apps/<slug>` is a template over three files the app's
own repository publishes - `marketing/listing.json` (the store copy, six
languages, plus the store URLs), `marketing/privacy.md` (the policy) and the
`press-kit` branch's `index.json` (the deck as data). `npm run apps` reads them
at **build** time, downloads the images into `public/content/apps/` and exits
non-zero if any of it is missing. That URL is the one declared to Apple and to
Google as the app's privacy policy: a page that renders a hero and no policy is
a review rejection, so there is no degraded mode. Adding an app is an entry in
`content/apps.json` and nothing else - if you find yourself typing an app's
name, a screenshot path or a sentence of its description into this repository,
you are writing the same words for the second time and one of the two copies
will go stale.

**The page's shape comes from the press kit's `story`, not from its `shots`.**
A store deck is already a sequence somebody composed - one screen, one line, in
one order - and `story` is that sequence with the text still text instead of
burned into the picture: `headline` (with the newlines it was composed on),
`sub`, and the capture per platform. So the page is one block per step,
alternating white and a tinted band the way the home page does, with the
screenshot inside the same iPhone frame `BlockBuilder` uses; the first step
illustrates the hero, and the step with no image is the card the deck closes
on. `shots` is the raw list the same manifest also carries - fifteen files,
three devices - and laying that out is the version of this page that read as a
contact sheet. Only the device the page shows is downloaded.

**The two store badges are their owners' artwork and are served as files.**
`public/badges/*.svg` came from Apple's badge page and Google's partner
marketing hub, byte for byte. Both guidelines allow a page to choose the size
and nothing else, so never redraw, recolour, crop, tint or rename them, and
never put them through `npm run svg` - that pipeline rewrites paths and ids,
and the Play badge carries a `<style>` block react-native-svg has no
equivalent for. Render both at the same height, at least 40px, with clear space
around them (Apple asks a tenth of the height, Google a quarter; the row in
`AppLandingPage` uses the quarter).

**Colour an icon with `color`, not `fill` or `fills`.** Most sources paint with
`fill="currentColor"`, which is exactly what `color` sets, so one prop tints
every path whatever the file declares: `<SVGCheckmark color={channel.color} />`.
The generated `fills={[…]}` prop assigns colours per path by index, so it only
exists for the few multicoloured marks (a logo whose parts must differ), and it
breaks the moment the paths are reordered. `fill` is the fallback for the
sources that declare no fill at all, because their paths inherit the `<Svg>`'s
and never look at `currentColor`: `SVGCopy` is one of those. Rule of thumb:
reach for `color`, and only if the icon comes out black, open the source and
look at what its paths declare.

## Context

Max is looking for a mission. Anything that improves matching — keywords,
machine-readability, visible availability — outranks aesthetics.
