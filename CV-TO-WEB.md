# CV → WEB — what to do once the PDF is done

The PDF is the priority (2 pages, print-first). Everything here is deliberately
**out of scope for the PDF** and belongs to a later pass on a dedicated web
version of the CV.

---

## 0. Done already (on `/cv`)

- **JSON-LD `Person`** — `personJsonLd()` in `src/profile.tsx`, rendered in
  `src/app/cv.tsx`. Built from the rendered data (`worksFor` deduplicates by
  `cvGroup` exactly like the visible rows), so it cannot drift.
- **PDF `/Info` metadata** — `/Author`, `/Creator`, `/Subject`, `/Keywords`,
  scraped by the export script off the page's own `<head>`, which is itself fed
  from `profile.tsx`. One source of truth, three consumers.

## 1. JSON-LD (`schema.org/Person`)

**What it is.** A `<script type="application/ld+json">` block in the HTML
`<head>` holding the same facts as the page, but as data instead of layout.

**Why it matters.** Search engines, LLM crawlers and job aggregators read it
before they try to parse the rendered page. It removes every guess: which
string is the name, which is the job title, which company goes with which
dates. Today all of that has to be _inferred_ from a two-column React layout.

**Why it is not in the PDF.** JSON-LD is an HTML mechanism. PDF has no
equivalent; its only structured channel is the `/Info` dictionary (plus XMP),
which `scripts/generate-resume-pdf.mjs` already fills with
`/Author`, `/Subject` and `/Keywords`.

**Should `/` and `/resume` get one too?** Yes — but **not before the job title
is aligned across the three pages**. Right now they advertise three different
ones:

| Page                 | Title in `<head>`                                           |
| -------------------- | ----------------------------------------------------------- |
| `src/app/index.tsx`  | Senior Front-End **Architect**, React & React Native Expert |
| `src/app/resume.tsx` | Senior Front-End **Architect & Developer**                  |
| `src/app/cv.tsx`     | **Lead Front-End Developer**                                |

For a human clicking around, that reads as sloppiness. For a crawler, three
`Person` entities with the same `sameAs` links but conflicting `jobTitle` is
worse than no structured data at all — it is a contradiction stated in machine
-readable form. Align the titles first (`cvJobTitle` already exists and should
become the single source), then reuse `cvJsonLd()` on both pages.

`resume.tsx` also still renders the H1 "Front-End Architect." and is the page
the old PDF pipeline pointed at. Decide whether it survives at all, or becomes
a redirect to `/cv`.

Sketch:

```jsonc
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Maxime Thirouin",
  "alternateName": "Max",
  "jobTitle": "Lead Front-End Developer",
  "url": "https://moox.io",
  "email": "hello@moox.io",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toulouse",
    "addressCountry": "FR",
  },
  "sameAs": ["https://github.com/MoOx", "https://www.linkedin.com/in/MaxThirouin"],
  "knowsLanguage": ["fr", "en"],
  "knowsAbout": ["React", "React Native", "TypeScript", "Front-end architecture", "Design systems"],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Lead Front-End Developer",
  },
  "worksFor": [{ "@type": "Organization", "name": "…" }], // one per cvGroup
}
```

## 2. A canonical plain-text version — **after** the web version, not before

**Who lands on it?** Essentially no human. It is for machines: LLM agents,
scrapers, job boards. Discovery is not a link in the PDF — it is
`<link rel="alternate" type="text/plain" href="/cv.txt">` in the `<head>`,
plus the emerging `/llms.txt` convention at the domain root. So **nothing has to
be added to the PDF for it**; the existing `moox.io` footer + QR code are all a
human needs.

**Which is why it comes last.** The PDF is constrained to two pages; the web
version is not; the text version is derived from the _web_ version, not from
the PDF. Writing it before the long-form web CV exists would mean writing the
long-form content twice. Order: PDF → web → txt.

Its second use is defensive: a canonical text version makes a broken PDF text
layer detectable by diffing the two, instead of silently rotting — which is
exactly what Ghostscript did here for months (see the long comment in
`scripts/generate-resume-pdf.mjs`).

## 3. Name placement

On the page, the name comes after the job title, the subtitle and the
availability badge. A naive parser can take the first line for the name.

- **PDF**: solved by `/Author` in the metadata.
- **Web**: solved by JSON-LD (§1).
- Only worth changing the visual order if both of those turn out insufficient.

## 4. A "Services" / "Typical engagements" page

Questions a reader still has after two pages, which a CV has no room for and a
web page does:

- Why do clients come to me specifically rather than someone else?
- The three transformations I deliver most often.
- Which missions I turn down.
- Which technologies I no longer want to work with.
- Rescuing existing codebases vs. building from scratch — which do I prefer?
- How far the role goes: architecture only, or also hiring, coaching, team
  organisation?

The CV's "Front-End Architecture" card answers the first one partially
(its items are phrased as engagements, not as abstract competences). The rest
needs its own page.

## 5. HTML semantics — a dedicated pass on `/cv`

The reference is the React Native for Web accessibility guide:
<https://necolas.github.io/react-native-web/docs/accessibility/>. The goal is
markup a screen reader, a crawler and an LLM all read correctly, using the
props RNW maps to real HTML (`role`, `aria-*`, `href`, `accessibilityLevel`…)
rather than fighting the `View`/`Text` abstraction.

**Not a reading-order problem.** Verified with `pdftotext -raw` (content-stream
order) against `pdftotext` (geometric reconstruction): the DOM order is already
correct everywhere — every stat tile, every open-source card and every
testimonial emits its own fragments contiguously, attribution included. The
scrambling visible in default-mode extraction is poppler's column heuristic,
not a defect in the document. **Do not "fix" the DOM order** — there is nothing
to fix, and the investigation has already been done twice.

What is actually wrong is the _elements_, not their order.

**The one real defect found: `GradientText` renders one `<span>` per
character.** That is how the per-letter color interpolation works, and it is
fine visually, fine in the PDF (`pdftotext` reconstructs the word from glyph
positions) and fine for copy-paste. But in the served HTML the `<h1>` is:

```html
<span style="color:rgba(208,118,140,1)">L</span>
<span style="color:rgba(201,98,150,1)">e</span>
<span …>a</span><span …>d</span>…
```

Any extractor that joins nodes with a separator reads
`L e a d F r o n t - E n d D e v e l o p e r .`; one that joins without reads
`LeadFront-EndDeveloper.`. So the two most important strings on the page — the
job title `<h1>` and the `Max.` of the name block — are the only two that break
in HTML. JSON-LD rescues `jobTitle` for consumers that read it; a plain scraper
or an LLM handed the raw HTML gets neither. It also affects SEO, since this is
the `h1`.

Fix: give `GradientText` an `aria-label` (or a visually-hidden sibling text
node) carrying the whole string, so the per-character spans become presentation
only. Applies wherever `GradientText` is used, not just on `/cv`.

Other candidates for the same pass:

- Sections as real `section` elements with their `CvSectionTitle` as the
  heading, instead of `View` + styled `Text`.
- The experience rows as a list, and each row's title / company / dates as
  something better than three sibling `Text` nodes.
- The contact block: `address`, and `rel="me"` on the social links.
- Stat tiles: the value / label / comment triplet has no markup relation today.

## 6. Smaller items parked here

- **Two experience sections.** "Key Experiences" + "More Experience" read as
  two disjoint lists to a work-history parser, and the dates zigzag (page 1
  ends in 2012, page 2 restarts in 2026). Fine on paper where the layout
  carries the meaning; worth reconsidering for a web/text version, where it
  does not.
- **Rate.** Deliberately absent, discussed live. Could be a range on a Services
  page if inbound quality ever becomes a problem.
- **`Max. / Maxime Thirouin`.** Kept as-is on the CV; JSON-LD's
  `name` + `alternateName` removes the ambiguity for machines without touching
  the design.
- **putaindecode.io** is a blog _and_ a podcast. Its 22 articles are a manual
  figure in `putaindecodeArticles` (`profile.tsx`), because `blog.json` only
  indexes moox.io. A web version could fetch the real number from
  `https://putaindecode.io/articles?search=moox` instead.
