# WEB-REWORK — bringing the CV work to the site

Tracking document for the pass that propagates the `/cv` content rework
(see `CV-REWORK-JOURNAL.md`) to the home page and `/resume`, plus full FR/EN
i18n. Written to survive across conversations: each phase is independently
resumable. Update checkboxes as work lands.

Related docs: `CV-SPEC.md` (pre-decision skeleton), `CV-TO-WEB.md` (items
parked during the PDF pass — several are picked up here), `STATS.md` (figure
sources), `CV-REWORK-JOURNAL.md` (why everything is the way it is),
`CONTENT-NORMALIZATION.md` (frontmatter field contract + normalization
worklist feeding phases 4–5).

---

## Decisions made (2026-08-02, with Max)

1. **i18n content model — one file, bilingual fields.** Each
   `content/resume/*.md` stays a single file. Translated frontmatter fields
   become `{ en, fr }` objects (like testimonials already do); the body keeps
   its `EN --- FR` split but the markdown compiler parses it into
   `body.en` / `body.fr`. Fallback to EN when `fr` is missing. Never two files
   per experience.
2. **i18n routing — `/fr` prefix.** `moox.io/resume` (EN, default) and
   `moox.io/fr/resume`. Real URLs per language, hreflang, and the FR PDF can
   later render from `/fr/cv`.
3. **Job title — aligned everywhere on `cvJobTitle`.** Home, `/resume`, `/cv`,
   meta titles and JSON-LD all say **Lead Front-End Developer**. The split
   gradient effect on the home H1 is kept ("Front-End" highlighted). This
   unblocks the JSON-LD-on-all-pages item from `CV-TO-WEB.md` §1.
4. **Timeline expansion — statically generated pages rendered as a modal.**
   Each experience gets a real, statically generated route
   (`/resume/<slug>`): refreshing or deep-linking lands on the full detail
   (many URLs, good for SEO). Client-side navigation from the timeline
   renders the same content as a modal/overlay above the page, with view
   transitions making the modal "zoom" out of the timeline card. Basic
   concept today, to be implemented smartly.
5. **`?staticRendering` removed** (done — see below). When `/cv` and
   `/resume` share components, print-specific behavior stays available as an
   explicit option on the shared primitive — e.g. the `print` param on
   `gradientText*Styles` in `styles.ts` (solid-color fallback, since
   `background-clip: text` is dropped when printing) — never as a
   page-level mode again.
6. **`cv*` prefix dropped, content extracted to `src/profile.tsx`** (done —
   see below). `consts.tsx` keeps only site chrome (socials, menus, links).
7. **Home and `/resume` stay two pages.** Home is the "sexy" teaser — minimal
   info, entices to the detail; `/resume` is the technical, complete view in
   the CV's spirit. No merge.
8. **SkillsCards — one data source, teaser vs full rendering.** The domains
   in `profile.skillsDomains` are the single source. Home renders a _teaser_
   variant per card: title + a short editorial blurb (a new `blurb` field on
   the domain, in the voice of the current home prose) + at most 3–4 keyword
   items; `/resume` and `/cv` render the full `items` lists. Same visual card
   language, different density — never two hard-coded content sets again.

9. **/resume mirrors the CV's structure, timeline last.** (2026-08-02, with
   Max) Order: hero (eyebrow "Freelance since · location" before the title,
   like the CV; availability badge + languages up with the GitHub/LinkedIn
   links) → summary gradient band (kept CV-style: the page must stand alone
   for a visitor who never saw the home) → the 5 profile stat tiles inside
   the slightly-skewed indigo band (the old playful figures duplicated the
   photo pills and are gone) → Skills (full cards + techs logo strip) → Key
   Experiences (CV rows, linking to the detail modals) → Open Source → Talks
   & Community (community tiles live here, not in the stats band) →
   Education & Beyond Code → **Full History** (the complete timeline) last.
   No Testimonials section on /resume: a link to the LinkedIn
   recommendations (`recommendationsUrl`) instead - the full block stays on
   the home.

## Done

- **2026-08-04 — modal ↔ standalone split (route masking).** Decision 4
  amended: `/resume/$slug` is now a root route (`resume_.$slug.tsx`), a
  standalone page carrying only the entry + its group siblings (own meta,
  back-link to the timeline anchor) — what crawlers, reloads and shared URLs
  get, so the detail is no longer drowned by the whole résumé rendered
  behind a modal. From `/resume`, ⓘ clicks keep their real crawlable href
  but are intercepted (`infoOnPress`) and open `ResumeEntryModal` via
  `?detail=<slug>` masked as `/resume/<slug>` (TanStack route masking — the
  Next.js intercepting-routes equivalent). The page behind stays mounted, so
  timeline scroll survives open/close for free. Remaining modal polish:
  focus trap + restoration, close button, reduced motion.

- **2026-08-02 — `cv*` → `src/profile.tsx`.** All profile/CV content moved
  out of `consts.tsx` into `src/profile.tsx`, prefix dropped. Notable
  renames: `cvJsonLd` → `personJsonLd`, `cvLocation` → `workLocation`
  (importing `location` would shadow `window.location`), `cvProfileStats` →
  `profileStats` (local var in `cv.tsx` renamed `stats` to avoid collision),
  `cvTestimonials` → `featuredTestimonials` (still selected by the `cv: true`
  flag in `BlockTestimonials.tsx`), `CvStat` → `ProfileStat`,
  `cvTalksSelectedSlugs` → `selectedTalksSlugs`. Frontmatter field names
  (`cvGroup`, `cvPitch`, `cv`) are unchanged — renaming them means touching
  the markdown files and `api.tsx`; parked as an open question. Also fixed a
  latent import-casing bug: the file on disk is `SVGSquareStack3DUpFill.tsx`
  (capital D), imports said `3dUp`.
- **2026-08-02 — frontmatter fields renamed.** `cvGroup` → `group`,
  `cvPitch` → `groupPitch` across `content/resume/*.md`, `api.tsx`,
  `profile.tsx`, `cv.tsx`, CLAUDE.md and STATS.md. JSON regenerated.
- **2026-08-02 — Phase 2 (home) + site-wide title alignment.**
  `jobTitleParts` (`["Lead", "Front-End", "Developer"]`) added to
  `profile.tsx` with `jobTitle` derived from it; `BlockHey` renders the split
  with the flashy gradient on "Front-End" (the searched term) and shows the
  availability badge. `BlockFrontendArchitect` → `BlockPitch` (tagline +
  summary from profile). `CvSkillCard` → `SkillCard` (shared; new `blurb` and
  `glass` options), `SkillsCards` is data-driven from `skillsDomains` with
  `teaser` (home) / `full` (`/resume`) modes — teaser shows `blurb` + the
  curated `keywords` field (not `items.slice`, the full items are phrased as
  engagements). `/`, `/resume` and `/cv` all advertise "Lead Front-End
  Developer" in H1/meta and all carry `personJsonLd` — the CV-TO-WEB.md §1
  blocker is resolved.
- **2026-08-02 — poster cards + OSS band + group modals.** New low-level
  `Card` component (`src/components/Card.tsx`): dark movie-poster card -
  background image with the brand gradient laid over it (solid gradient when
  no image), slotted content (pretitle caps / title / subtitle / text /
  children / tags) and an ⓘ button (`svgs/info.circle.svg` →
  `SVGInfoCircle`) opening the detail modal. `/resume` Experience is now a
  2-per-row (wrap) grid of these cards (job title as pretitle, company big,
  pitch, stats line, hashtags); Open Source became a full-bleed band (same
  gradient as the old card, opposite skew to the stats band) hosting the
  intro + credits + the four entries as the same `Card`s -
  `CvOpenSourceCard` is now CV-only. Grouped clients open ONE modal with
  every mission of the group in sequence (`/resume/$slug` loader fetches the
  group; only the visited entry keeps the view-transition name). Talks &
  Community tiles now link to `/talks` and `/blog`, plus a line linking the
  putaindecode articles (`?search=moox`) and podcasts. Max also curated
  `hobbies` down to 6 items all flagged `cv: true` - the /cv render changes
  (Bricolage added), to check when the PDF is regenerated.
- **2026-08-02 — /resume restructured as the web CV.** Hero reworked
  (eyebrow before H1, `jobSubtitle` as subtitle, badge + languages moved next
  to the links); summary band placed like the CV; `ResumeStats` now hosts the
  5 profile tiles (glass/gradient `StatTile`s) on the skewed indigo band;
  `techs` + `hobbies` (with a `cv: true` flag for the print subset) +
  `statsLine` + `keyExperiences` moved to profile.tsx and shared with
  `cv.tsx`; Key Experiences rows (CV format, clickable to the modals), Open
  Source (`CvOpenSourceCard`), Talks & Community (+ LinkedIn recommendations
  link), Education & Beyond Code (gradient icons via `#profileGrad`) all on
  `/resume`; timeline renamed "Full History", last section. `ResumeIntro`
  deleted - its pieces were redistributed (meta → hero, band → summary,
  Multiverse → Beyond Code, Toolbox → techs strip).
- **2026-08-02 — home dedup + phase 3 core.** The home said its pitch twice
  ("I make complex front-ends. Boring." + the tagline block): `BlockBuilder`
  (indigo band, component was misnamed `BlockPassionated`) now carries the
  canonical `taglineParts` + `summary`, and `BlockPitch` before the skill
  cards got a new intro (`skillsPitchTitle`/`skillsPitch` in profile.tsx,
  reworked from the old "Front-end Architect" prose). On `/resume`:
  `ResumeIntro` remodeled on the CV header + summary band (meta facts,
  availability badge, languages, then tagline + summary on a plain CSS
  gradient); full stats grid (profileStats + talks / blog+putaindecode /
  GitHub followers / co-founder tiles, loader now fetches talks & blog);
  `CvStatTile` → `StatTile`. Timeline: every entry links to a real statically
  generated `/resume/$slug` page (child route rendered as a modal above the
  timeline via `Outlet`), with a shared view-transition name per card
  (`resumeEntryTransitionName`) so the modal "zooms" from the card - the open
  card gives up its name (`activeSlug`) to keep names unique. Detail mode of
  `ResumeTimelineEntry` shows `groupPitch`, the markdown body (EN part) and
  per-mission `stats` tiles; the timeline itself no longer inlines bodies.
- **2026-08-02 — Experience rows (`ExperienceCard`).** The 2-per-row poster
  grid on `/resume` is replaced by full-width horizontal cards
  (`src/components/ExperienceCard.tsx`): quiet themed surface (hairline
  `ultraLight` border + `backMainAlpha05` tint, the StatTile "plain" family),
  copy on the left, the illustration bleeding in from the right through an
  angled CSS opacity mask (`mask-image: linear-gradient(105deg, …)`) — chosen
  over a gradient overlay so the image dissolves into any background without
  replicating its colors, in both themes. Stats render as accent pills
  (`textFlashy2`), hashtags as the closing line. `Card` (poster) stays for the
  Open Source band.
- **2026-08-02 — `?staticRendering` removed.** Gone from `resume.tsx`
  (validateSearch, print styles, forced light scheme, PDF-only contact rows,
  QR footer), `ResumeTimeline`, `ResumeTimelineEntry`
  (`hideImage`/`showBody`/`flat` props), `ResumeIntro`, `Me` and the three
  `BlockMe*WithPills` blocks. The `styles.ts` gradient param was renamed
  `staticRendering` → `print` and kept: `/cv` uses it (decision 5).

---

## Guardrails (from CLAUDE.md + the CV pass — they cost real damage)

- **`src/app/cv.tsx` is done. Don't touch it** except mechanical renames from
  the consts refactor and, later, the i18n field reads. Any visual/content
  change there requires regenerating and re-verifying the PDF
  (`pdftotext … | head -40`).
- Derive, never hand-write (dates, counts). Flags, not positions.
- Numbers must be checkable (`STATS.md`).
- The title is **Lead Front-End Developer** — no "Architect" comeback.
- Repo artifacts (code, docs, commits) in English; FR lives only in the
  `{ en, fr }` content fields.

---

## Phases

### Phase 1 — Consts refactor (foundation, pure rename) ✅ done 2026-08-02

- [x] Rename `cv*` exports; update all imports. No behavior change.
- [x] Extracted to `src/profile.tsx` (docs updated: CLAUDE.md, STATS.md,
      CV-TO-WEB.md).
- [x] Typecheck + build pass. Regenerate the PDF once at the end of the whole
      rework, not per-phase.

### Phase 2 — Home page alignment ✅ done 2026-08-02

- [x] `BlockHey`: H1 → "Lead Front-End Developer." from `jobTitle`, keeping
      the two-tone gradient split (highlight "Front-End"); subtitle from
      `jobSubtitle`; availability badge + `availabilityLabel`/`Detail`?
      (nice-to-have — Max wants visible availability).
- [x] Pitch: reuse `tagline` + `summary` (ex-`cvTagline`/`cvSummary`) for the
      intro copy instead of the ad-hoc text in `BlockFrontendArchitect`
      (whose heading still says "Front-end Architect.").
- [x] `SkillsCards` fed by `skillsDomains` per decision 8: add a `blurb`
      field per domain (rewrite the current home prose in the CV's voice —
      the ES1 line and the APIs/GraphQL framing are stale), teaser variant on
      home, full items on `/resume`. Adds the AI-assisted engineering card.
      Keep the visual card style.
- [x] Meta title/description from profile (today hard-coded "Senior Front-End
      Architect" in `index.tsx` head).
- [x] Keep `BlockMe1WithSmallPills` (photo + pills) as is.
- [x] Add JSON-LD `Person` (`personJsonLd`), now that titles are aligned.

### Phase 3 — /resume rework (the big one)

The page becomes the _unconstrained_ CV: same structure and content sources as
`/cv`, but nothing shortened for the 2-page format, and real CSS gradients
(no per-character `GradientText` tricks — those exist only for print/PDF
engines; the web already has `gradientText*Styles` that work).

- [x] H1 → `jobTitle` (done 2026-08-02, with meta + JSON-LD).
- [x] Keep `BlockMe2WithPills` (photo + pills) — untouched.
- [x] "About Me" (`ResumeIntro`) remodeled on the CV header/summary band:
      meta info (freelance since, location, availability, languages,
      contacts) then `tagline` + `summary` on a real gradient band.
- [x] All profile stats (`profileStats`) + talks/blog tiles (done 2026-08-02).
- [x] Skills: full `skillsDomains` cards (`mode="full"`). Tech logo strip:
      still TODO (the CV's `techs` row is defined in `cv.tsx`; move it to
      profile.tsx to share).
- [x] Timeline: per decision 4, static `/resume/<slug>` routes rendered as a
      modal over the timeline on client-side navigation, view-transition
      "zoom" from the card (full body, stats, hashtags, links, `cvPitch`);
      highlight/group logic can reuse the derivations (`mergeGroup`,
      `groupPeriods`) where it helps, but the timeline shows _all_ entries,
      not the folded selection.
- [ ] Open Source, Testimonials (full set, not `cv: true` subset),
      Education, Beyond Code sections — web-sized.
- [x] Remove `staticRendering` plumbing (done 2026-08-02).
- [x] Meta + JSON-LD from `profile.tsx` (done 2026-08-02).

Remaining for phase 3 (polish & sections):

- [x] Open Source, Talks & Community, Education, Beyond Code sections on
      `/resume` (done 2026-08-02). Testimonials: link to LinkedIn
      recommendations instead of a section (decision 9).
- [ ] Modal polish: focus trap + focus restoration, close button inside the
      card, scroll restoration of the timeline position on close, reduced
      motion for the zoom.
- [x] `techs` (and `hobbies`, `statsLine`, `keyExperiences`) moved to
      profile.tsx, shared by `/cv` and `/resume` (done 2026-08-02).

### Phase 4 — Markdown bodies (content writing)

- [ ] Rework each mission body with the CV formula: situation → the hard
      part → what I did → the number. The frontmatter fields were reworked in
      the CV pass; the bodies were not. The modal gives them room.
- [ ] EN first, then FR translation of each body.
- [ ] Priority order: highlights (aardvark, exem, fklg, transport-_/hove,
      teacher-_), then the rest.

### Phase 5 — i18n plumbing

- [ ] Markdown compiler: parse `{ en, fr }` frontmatter fields + split body
      into `body.en`/`body.fr`; update `ResumeItem` types and every consumer
      (EN fallback).
- [ ] Translate consts strings (tagline, summary, skills items, labels…) —
      same `{ en, fr }` shape or a light dictionary; decide at impl time.
- [ ] `/fr` route prefix (TanStack Router), language switcher, `hreflang` +
      `lang` attributes.
- [ ] Later: FR PDF from `/fr/cv` (needs `cv.tsx` to read localized fields —
      the one sanctioned `cv.tsx` change).

### Phase 6 — Documentation

- [ ] Update `CV-REWORK-JOURNAL.md` with this pass (new sections).
- [ ] Prune `CV-TO-WEB.md` items done here (title alignment, JSON-LD,
      `/resume` fate); keep the still-parked ones (plain-text CV, Services
      page, HTML semantics pass — note `GradientText` per-char spans still
      need the `aria-label` fix, see its §5).
- [ ] Update `CLAUDE.md` where-things-are table if files moved/renamed.

---

## Open questions (ask Max when reached)

- Home pitch wording: reuse `summary` verbatim, or a shorter home-specific
  variant derived from it?
- Skills teaser keywords: exactly which 3–4 items per domain surface on the
  home cards (decision 8 says "at most 3–4"; pick with Max on real render).
- FR translations of editorial strings: Max writes them, or draft-then-review?
