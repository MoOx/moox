# CV → WEB — what to do once the PDF is done

Written during the PDF pass, when everything here was out of scope for a
two-page print document. The web pass has since happened (`WEB-REWORK.md`), so
§0 records what it closed and the rest is what genuinely remains — mostly the
plain-text version (§2, now unblocked), the Services page (§4) and the HTML
semantics pass (§5).

---

## 0. Done already

Everything here landed in the web pass — see `WEB-REWORK.md` for the how and
the why. Kept as a list so this document says what is _left_.

- **JSON-LD `Person`** — `personJsonLd()` in `src/profile.tsx`, now rendered on
  **all three pages** (`/`, `/resume`, `/cv`), localized with the page. Built
  from the rendered data (`worksFor` deduplicates by `group` exactly like the
  visible rows), so it cannot drift. This closes §1 below.
- **The job title is aligned** across `/`, `/resume`, `/cv`, their `<head>` and
  the JSON-LD: `Lead Front-End Developer` everywhere, which is what §1 was
  waiting for.
- **PDF `/Info` metadata** — `/Author`, `/Creator`, `/Subject`, `/Keywords`,
  scraped by the export script off the page's own `<head>`, which is itself fed
  from `profile.tsx`. One source of truth, three consumers — now per language.
- **A real web CV** — `/resume` is the unconstrained version of the same
  content (§ everything that was "later, on the web" in this file).
- **French version** — `/fr/...` for home, résumé, CV and contact, plus a second
  PDF (`…-resume.fr.pdf`). `hreflang` + canonical on every page.

## 1. JSON-LD (`schema.org/Person`) — **done**

Shipped on `/`, `/resume` and `/cv` (`personJsonLd()` in `src/profile.tsx`),
built from the rendered data and localized with the page. The blocker recorded
here was that the three pages advertised three different job titles, which
would have published a contradiction in machine-readable form; the web pass
aligned them on **Lead Front-End Developer** first, then reused one builder.
`/resume` survived the "keep it or redirect it?" question: it is now the
unconstrained web CV, not a leftover.

Still true, and worth keeping: JSON-LD is an HTML mechanism. The PDF has no
equivalent — its only structured channel is the `/Info` dictionary (plus XMP),
which `scripts/generate-resume-pdf.mjs` fills per language.

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
long-form content twice. Order: PDF → web → txt — **the first two are done, so
this one is next in line.** Two files now, one per language (`/cv.txt`,
`/fr/cv.txt`), derived from the same localized content the pages read.

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
