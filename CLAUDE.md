# moox.io

Personal site + CV. TanStack Start, React Native Web (`react-multiversal`),
content authored as markdown in `content/` and compiled to JSON by
`npm run markdown`.

## Where things are

| What                               | Where                                  |
| ---------------------------------- | -------------------------------------- |
| The CV page (source of the PDF)    | `src/app/cv.tsx`                       |
| CV copy, figures, derivations      | `src/profile.tsx`                      |
| Missions / open source / education | `content/resume/*.md` frontmatter      |
| Testimonials                       | `src/components/BlockTestimonials.tsx` |
| PDF export                         | `scripts/generate-resume-pdf.mjs`      |

Longer context, only read when relevant:

- `CV-REWORK-JOURNAL.md` — everything that was wrong, changed, and why
- `CV-TO-WEB.md` — deliberately deferred to a later web pass
- `STATS.md` — the source and refresh command for every figure on the CV

## Rules that cost real damage when broken

**Never put Ghostscript back in the PDF pipeline.** `gs -sDEVICE=pdfwrite`
rewrites the whole document, text included, and silently destroys the text
layer — characters drop from the start of words (`Simpler` → `er`). The PDF
still _looks_ perfect, so nothing reveals it until an ATS or an LLM reads the
file. It shipped broken for months. Use qpdf (streams + images, text
untouched), plus pngquant served through Playwright request interception so
source assets are never degraded.

After **any** change to the export script, verify:

```sh
pdftotext public/maxime-thirouin-freelance-front-end-developer-resume.pdf - | head -40
```

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

## Context

Max is looking for a mission. Anything that improves matching — keywords,
machine-readability, visible availability — outranks aesthetics.
