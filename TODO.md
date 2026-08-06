# TODO — the active worklist

The only place with open items. History (what was done and why) lives in
`CV-REWORK-JOURNAL.md`; field contracts in `CONTENT-NORMALIZATION.md` and
`src/api.tsx`; figure sources in `STATS.md`.

State, 2026-08-06: the CV, both PDFs, the site and its French version are done
and audited. Nothing below blocks anything.

---

## 1. Mission bodies — the CV formula (content writing)

**Everything that carries weight is already done.** Audited 2026-08-06, file by
file: the four `highlight` entries (`2024-aardvark`, `2025-exem`,
`2019-transport-mobile-app`, `2020-teacher-university`), the rest of the Hove
and FKLG groups, `2025-learnee` and the four open-source entries are written on
the formula — situation → the hard part → the decision → the result, 150–420
words, EN and FR in step.

What is left is the tail: entries whose body still reads like the pre-rework
CV, `Development of a…` followed by a bullet list of tasks. They only surface
in the detail modal and on `/resume/<slug>` (the printed CV never renders a
body), so this is polish, not exposure.

The three entries that had real material behind a weak text were rewritten
2026-08-06 — `2024-enjoy` (its pitch too: "shipping features and fixing bugs"
was maintenance vocabulary on a lead's CV), `2019-tv-app-*` and
`2016-admin-app`. Same rule each time: only facts already in the file, no
invented figure. What is left:

- [ ] **Short archive entries, one honest paragraph each, no formula needed:**
      `2015-workflow-management-app`, `2015-web-widget`, `2015-tv-web-app`,
      `2014-accounting-app`, `2014-event-app`, `2014-feed-app` (12 words today),
      `2010-high-trafic-frontend`, `2009-e-commerce-platform`,
      `2008-music-social-network`, `2007-first-job`,
      `2018-research-and-development-*`.
- [ ] Optional: `2012-dashboard` is prose already and reads fine — it just
      predates the formula (no result at the end).

Rules when touching any of them: EN and FR **in the same edit** (a French half
written later drifts — journal §12; the detector is the FR/EN word-count ratio,
1.1–1.3× is normal), and the body _extends_ the pitch instead of restating it.

Not to be confused with work: the ~12 entries with **no body at all** are
deliberate — the duplicate `teacher-*` years are covered by the IUT group
entry, and the story entries (1985 → 2006) never had prose. The compiler drops
empty bodies on purpose.

## 2. Theme toggle + language switcher (design + one real bug)

Both controls need a proper home in the layout, mobile included.

- [ ] **Bug**: `LanguageSwitcher` is inside `IfWindowWidthIs largerThan=s` in
      `src/components/WebsiteHeader.tsx` — below 768px the only way to reach
      French is the footer link.
- [ ] **Design**: the theme toggle's "Appearance / AUTO" label sits at
      `opacity: 0.25` (the last 8 axe nodes). No colour passes AA at that
      opacity; conforming means raising the resting opacity. Max wants to
      rework how the control is integrated anyway.

Re-run `npm run a11y` afterwards — 8 is the number to beat, and it should
reach 0.

Noted while verifying something else, 2026-08-06: the toggle also throws
React hydration mismatches on every page (its icons' `opacity`, `transform`
and `color` differ between server and client render). Same control, worth
fixing in the same pass.

## 3. Editorial questions, best answered in front of the render

- [ ] Home pitch wording: reuse `summary` verbatim, or a shorter home-specific
      variant derived from it?
- [ ] Skills teaser keywords: which 3–4 items per domain surface on the home
      cards (the full `items` are phrased as engagements, hence the separate
      `keywords` field).

---

## Parked on purpose (not forgotten, not next)

- **The CV's section titles stay English** — `Experience`,
  `Additional Experience`, `Testimonials`, `All recommendations on`,
  `Full history & all my experiences online:`, `Also:` in `CvOpenSourceCard`.
  Translating them means regenerating **both** PDFs and re-checking the page
  count (French only fits at `scale: 0.97`), so it happens in one deliberate
  pass or not at all.
- **`GitHub Arctic Code Vault Contributor`** — the name of a distinction, kept
  verbatim like a proper noun. `/blog` and `/talks` are English-only by
  decision.
- **Two experience sections.** "Key Experiences" + "More Experience" read as
  two disjoint lists to a work-history parser, and the dates zigzag. Fine on
  paper, where the layout carries the meaning; reconsider if a plain-text or
  feed version ever exists.
- **Rate.** Deliberately absent. Could become a range if inbound quality ever
  becomes a problem.
- **Name placement.** The name comes after the title and badge on the page; a
  naive parser could take the first line for the name. Already answered for
  machines — `/Author` in the PDF, JSON-LD on the web. Only worth changing the
  visual order if those turn out insufficient.
- **`putaindecode.io` article count** is a manual figure
  (`putaindecodeArticles` in `profile.tsx`, sourced in `STATS.md`) because
  `blog.json` only indexes moox.io. A web version could fetch the real number
  from `https://putaindecode.io/articles?search=moox`.

## Dropped (2026-08-05, Max)

- **A canonical plain-text CV.** Not interested.
- **A "Services" / "Typical engagements" page.** Not for now.
