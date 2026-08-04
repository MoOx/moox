# CONTENT-NORMALIZATION — one job per field

Analysis pass (2026-08-03) on `content/resume/*.md`: how `title`,
`description`, `groupPitch` and the body are actually used across surfaces,
what drifted, and the proposed contract. Feeds phases 4–5 of `WEB-REWORK.md`.

Status: **decisions taken 2026-08-03 (with Max), mechanical pass applied** —
see §4 for what landed and §6 for what stays open.

---

## 1. Where each field renders today

| Field         | /cv (locked)                                       | /resume                                        | Timeline card           | Detail modal (`/resume/$slug`)                |
| ------------- | -------------------------------------------------- | ---------------------------------------------- | ----------------------- | --------------------------------------------- |
| `title`       | fallback for `job_title` in rows                   | fallback for `job_title` (pretitle)            | fallback pretitle       | uppercase eyebrow, page `<title>`, aria-label |
| `job_title`   | row bold line (`job_title ?? title`)               | card pretitle (small caps)                     | card pretitle           | eyebrow (via title fallback)                  |
| `company`     | row second line                                    | small line `Company · dates`                   | same                    | top right, italic                             |
| `description` | "Additional Experience" one-liner; OSS card text   | **card headline** (key experiences + OSS text) | **card headline**       | big title line, meta description              |
| `groupPitch`  | key-experience pitch (`groupPitch ?? description`) | key-experience card body                       | —                       | lead paragraph                                |
| `body`        | —                                                  | —                                              | —                       | full text (EN part before `<hr>`)             |
| `stats`       | `statsLine` on key rows; OSS headline figure       | accent pills; OSS headline figure              | — (pills off currently) | StatTile grid                                 |

Since the 2026-08-03 card rework, **`description` is the headline** of every
experience card and `title` only surfaces as pretitle fallback and in the
modal. That promotion is what makes the old inconsistencies visible.

## 2. What drifted (with the actual offenders)

1. **`groupPitch` is misnamed.** Two of the five pitches sit on entries with
   no `group` at all (`2024-aardvark`, `2025-exem`). The field's real meaning
   is "the editorial pitch of the condensed row"; covering the whole group is
   a property of _highlight entries of a group_, not of the field.
2. **`job_title` is not always a role.** `2026-fklg` says
   `job_title: "Portfolio & VOD Platform"` — a project type stuffed into the
   role slot because the layout wanted a line there. Meanwhile genuinely
   role-shaped values exist ("Lead Front-End Developer", "Creator &
   Maintainer", "University Lecturer").
3. **`title` mixes three registers.** Entry names ("Urban Dashboard",
   "Transport Mobile App"), editorial hooks ("CSS game changer in 2015",
   "Kicked off stylelint", "Static sites with React, before Next.js"), and a
   joke headline ("Un site pour le mec de Bref." — FR on the EN site). The
   OSS hooks are effectively descriptions; `/resume` already routes around
   them by deriving the display name from the slug (`projectName`).
4. **`description` register wobbles.** Mostly clean noun phrases, but some
   end with a period (`2008`, `2010`, `2024-enjoy`), one carries corporate
   history in the company field instead ("Jirafe (now part of SAP Hybris)"),
   and roles hide inside descriptions ("Technical manager of a sunglasses
   e-shop…" on `2009-fittingbox`) where `job_title` is empty.
5. **Old jobs have no `job_title` at all** (2007–2016): the pretitle slot
   falls back to `title`, so a project name renders in the role slot.
   Acceptable visually, but the role information is simply missing data.
6. **Bodies are three different things.** Bilingual `EN --- FR` missions
   (parsed by the `bodyBeforeFirstHr` hack), EN-only OSS entries, and ~10
   entries with no body at all. Already planned: phase 4 rewrites (CV
   formula), phase 5 parses `body.en`/`body.fr`. Normalizing the frontmatter
   _before_ phase 5 avoids renaming fields twice once `{ en, fr }` lands.
7. **Levels repeat instead of adding.** e.g. `2025-exem`: description, pitch
   and body all re-explain the map/URL sync idea. Each level should add
   information, not restate the previous one with more words.

## 3. Proposed contract — the content ladder

Each field has exactly one job; each level _adds_ information:

| Field         | Job                                                                                                                                | Register                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `title`       | The entry's **name** (project/event): "Urban Dashboard", "cssnext"                                                                 | Noun phrase, 2–5 words, no period |
| `job_title`   | A **real role** only: "Lead Front-End Developer", "Creator & Maintainer". Absent when there isn't one.                             | Role wording a recruiter searches |
| `company`     | Org name only — no parentheticals, history goes to the body                                                                        | —                                 |
| `description` | **What it is**, one factual line — the card headline                                                                               | ≤ ~90 chars, no trailing period   |
| `pitch`       | **What I did & why it mattered** — one paragraph, CV formula (situation → hard part → what I did → number)                         | Editorial, first person implied   |
| `groupPitch`  | Same as `pitch` but covering every mission of the group at once — **only on the `highlight` entry of a `group`** (Hove, IUT, FKLG) | Same                              |
| `body`        | The full story (EN + FR; `{ en, fr }` split in phase 5). Extends the pitch, never repeats it.                                      | Markdown prose                    |

Decision 2026-08-03: `groupPitch` **keeps its name and its group semantics**;
ungrouped entries use the new `pitch` field. Condensed views read
`pitchOf(item) = groupPitch ?? pitch` (helper in `profile.tsx`); the CV
appends its own `?? description` last resort. UI mapping stays what it is
today: pretitle = `job_title ?? title`, headline = `description`, body of the
condensed cards = `pitchOf`.

### Short (CV) vs long (web) — recommendation: no extra variant

Question raised: should the condensed pitch exist in a _short_ version for
the PDF/cards and a _long_ one for the web, where space is free?
Recommendation: **no fourth prose field**. The ladder already provides both
ends: `description` is the short form, `pitch`/`groupPitch` is the condensed
paragraph, and the **body is the long version** — it renders one click away,
in the modal, right under the pitch. Reusing the CV-calibrated pitch verbatim
on the web cards is a feature: one text to write, keep true, and soon
translate (×2 with FR); the 2-page constraint is precisely what keeps pitches
sharp. If a web card ever feels thin, the fix is a better body behind the ⓘ,
not another intermediate field ×40 files.

## 4. Mechanical pass (schema, no rewriting)

Applied 2026-08-03 (JSON regenerated, lint/tsc green, PDF regenerated and
text-verified with `pdftotext`):

- [x] New optional `pitch` field (`api.tsx`) + `pitchOf` helper
      (`profile.tsx`); consumers switched (`cv.tsx` — sanctioned one-line
      change, `resume.tsx`, `ResumeTimelineEntry.tsx`).
- [x] `2024-aardvark` / `2025-exem`: `groupPitch:` → `pitch:` (no `group`).
- [x] `2026-fklg`: `job_title` → "Full-Stack Developer" (was a project type).
- [x] `job_title` backfill on 2007–2016 (Max: "Full-Stack Developer" default,
      adjust as needed): Kiweb, Roularta, Jirafe, Airbus, Social Share,
      Molotov, BeOp, One2Team, Mphasis → **Full-Stack Developer**;
      Fittingbox → **Technical Manager** (its own description says so);
      Shopbot → **Front-End Developer** (the entry is literally "First focus
      on front-end"); ViaReport: legacy `role: "Front-end Developer"` field
      converted to `job_title: "Front-End Developer"`.
      ⚠️ Visible consequence on the **/cv PDF**: "Additional Experience" rows
      render `job_title ?? title`, so they now lead with the role
      ("Full-Stack Developer · Mphasis") instead of the project name
      ("Specific Admin App · Mphasis"). Classic resume format, but review.

Still to do (cheap):

- [x] `2012-dashboard`: `company: "Jirafe"`, SAP (Hybris) note moved to the
      body (EN + FR) — done 2026-08-03.
- [x] ~~OSS entries: `title` becomes the project name~~ — dissolved by the
      title collapse (§7): the display name stays `projectName(slug)`, the
      hooks became pitch material.
- [x] Trailing periods — enforced during the title collapse (§7).
- [x] `1985` / `1995` / `1999` story entries flagged `personal: true` (done
      2026-08-04) — consistency with `2003` / `2006`; no rendered change
      (no `company`, they were already excluded from work-history filters).

## 5. Content pass (writing, needs Max)

One file at a time, priority = what the timeline now shows first:

- [x] **Roles reviewed** — Max hand-tuned the 2007–2016 defaults
      (Shopbot/Jirafe/ViaReport → Lead, Molotov → Senior Front-End
      Consultant, One2Team → Lead Mobile Developer…) and the rest was
      completed with him (teachers, Hove 2017/2023 → Lead, Loewe/Enjoy →
      Front-End Developer, unebonneboutique → Full-Stack Developer).
- [x] **Pitches for the timeline's top entries** — `2024-enjoy` and
      `2019-tv-app` (Loewe) got theirs 2026-08-04, facts sourced from their
      bodies (MVP→production; re-architecture + animations + Cocoapods
      untangling). `2023-transport-web-app` is covered by the Hove group
      modal. Not every 2008 gig needs one.
- [x] **De-duplicate the ladder** — done 2026-08-03 on all five (exem,
      hove, aardvark, teacher, fklg). The rule that emerged: **the number
      lives in the stat pill, the what-it-is in the title; the pitch only
      keeps decisions and hard parts** — ≤ 3 sentences, verb-first with the
      implied "I" (US resume register; never drop articles off noun subjects,
      that's headlinese). Consequence: `/cv` key rows now render `titleOf(h)`
      above the pitch — the pitches stopped saying what the project is, so
      the row must. Pitches shrank 25–40% (fklg grew: its old pitch was a
      title duplicate and said nothing Max did).
- [x] ~~`title` register pass~~ — superseded: the field was collapsed
      entirely, see §7.
- [ ] Then phase 4 as planned (bodies, CV formula, EN then FR).

## 6. Decisions

Taken 2026-08-03 (Max): `groupPitch` keeps name + group-only semantics, new
`pitch` for ungrouped entries with `pitchOf` fallback; fklg = Full-Stack
Developer; old entries backfilled with Full-Stack Developer by default; no
short/long pitch split (recommendation §3 accepted implicitly — body is the
long form). OSS `job_title`s were already real roles ("Creator & Maintainer"
on cssnext/phenomic, "Originator" on stylelint — he opened the founding
issue, didn't maintain it, "Maintainer" on rescript-react-native): kept as
is, more precise than a blanket "Creator & Maintainer".

Taken 2026-08-03 (later, Max): **drop the old `title` field entirely** — its
information folds into the one-liner where it adds something, and
`description` is renamed `title`. No more `job_title ?? title` fallbacks.
This dissolves the "OSS titles → project names" question (the display name
stays `projectName(slug)`; the hooks became pitch material). Executed — §7.

## 7. `title` collapse — executed 2026-08-03

The final model, one register per field, no fallbacks:

- `job_title` — the role (absent only on story/personal entries and the 2018
  R&D entry; there the pretitle slot stays empty by design).
- `title` / `groupTitle` — the one-liner (ex-`description`), headline
  everywhere. `groupTitle` mirrors `groupPitch`: the group-wide line, only on
  the `highlight` entry of a `group`, read via `titleOf()` — because the
  highlight mission's own title only names one project ("iOS / Android app…"
  where Hove also shipped a web app). Timeline and modal keep per-mission
  titles on purpose. Today: Hove ("iOS / Android & web apps built for cities
  and transport networks") and IUT ("Teaching C, web fundamentals & Agile
  methodology to university students"); the FKLG lead's own title already
  covers its group.
- `pitch` / `groupPitch` — the condensed paragraph (`pitchOf`).
- `body` — the full story.

What was done:

- Roles completed with Max: teachers 2012–2019 → "University Lecturer", Hove
  2017 & 2023 → "Lead Front-End Developer", Loewe & Enjoy → "Front-End
  Developer", unebonneboutique → "Full-Stack Developer". (Max had already
  hand-tuned several 2007–2016 defaults: Shopbot/Jirafe/ViaReport → Lead,
  Molotov → "Senior Front-End Consultant", One2Team → "Lead Mobile
  Developer"…)
- Narrative titles folded into the new one-liner ("First job - real estate
  portal & online shops (Zend Framework)", "First focus on front-end - UI
  development on high-traffic websites", "Reality TV race - Pékin Express
  #20"…). The fklg joke "Un site pour le mec de Bref." left the frontmatter —
  candidate to come back as the FR pitch opener in phase 5.
- OSS: hooks dropped where redundant; cssnext kept its full two-sentence
  line (the `/cv` card shows it) and gained a `pitch` ("A CSS game changer in
  2015…", facts from its body).
- `2012-dashboard`: `company: "Jirafe"`, the SAP (Hybris) acquisition moved
  into the body (EN + FR).
- Code: `description` removed from `ResumeItem`; every `job_title ?? title`
  fallback removed (a long line in the role slot would be worse than an
  empty one); modal eyebrow now `job_title`; `/resume/$slug` meta description
  now `pitchOf ?? title`. `cv.tsx` + `CvOpenSourceCard` updated (sanctioned),
  PDF regenerated and `pdftotext`-verified.

Trailing-period register (≤ ~90 chars, factual, no final period) enforced on
the new titles; multi-sentence lines (cssnext) keep their punctuation.
