# CONTENT-NORMALIZATION — one job per field

The frontmatter contract for `content/resume/*.md`. The authoritative types
live in `src/api.tsx` (`ResumeItem` / `ResumeItemSource`, both commented); this
document holds what a type cannot express — the **register** of each field and
the ladder they form.

How it got here (the drift that motivated each rule, the `title` collapse, the
mechanical passes) is in `CV-REWORK-JOURNAL.md` §5, §10 and §12. What is still
open is in `TODO.md`.

---

## The ladder — each level adds, never restates

| Field                  | Job                                                                         | Register                                 |
| ---------------------- | --------------------------------------------------------------------------- | ---------------------------------------- |
| `job_title`            | The **role**, and only a role. Absent when there isn't one (story entries). | Role wording a recruiter searches        |
| `title` / `groupTitle` | The **one-liner**: what it is. The headline everywhere.                     | ≤ ~90 chars, factual, no trailing period |
| `pitch` / `groupPitch` | **What I did and why it mattered** — the condensed paragraph.               | ≤ 3 sentences, verb-first, implied "I"   |
| `body`                 | The **full story**. Extends the pitch, never repeats it.                    | Markdown prose, `{ en, fr }`             |
| `company`              | Org name only — corporate history goes in the body.                         | Proper noun, never translated            |
| `stats`                | The numbers, each with its proof `url`.                                     | See `STATS.md`                           |

Three rules that emerged from applying it:

- **The number lives in the stat pill, the what-it-is in the title, and the
  pitch only keeps decisions and hard parts.** A pitch that re-explains the
  project is a level that adds nothing.
- **Verb-first with the implied "I"** (US resume register) — but never drop
  articles off noun subjects: that is headlinese, not resume voice.
- **Multi-sentence one-liners keep their punctuation**; single-clause ones take
  no final period.

### The `group` pair

`groupTitle` and `groupPitch` are the group-wide versions, and are meaningful
**only on the `highlight` entry of a `group`** — a client's row on the CV folds
several missions, so it needs a line that covers all of them (Hove ships an app
_and_ a web platform; the highlight mission's own title names one). Condensed
views read the helpers in `profile.tsx`: `titleOf = groupTitle ?? title`,
`pitchOf = groupPitch ?? pitch`. Timeline and modal keep per-mission titles on
purpose.

Entries without a group simply use `title` / `pitch` — there are no other
fallbacks left. A long line in the role slot is worse than an empty one, which
is why `job_title ?? title` is gone.

## Where each field renders

| Field                  | `/cv`                                   | `/resume`                         | Timeline card | Detail modal / page               |
| ---------------------- | --------------------------------------- | --------------------------------- | ------------- | --------------------------------- |
| `job_title`            | key row bold line                       | card pretitle                     | pretitle      | eyebrow                           |
| `title` / `groupTitle` | `titleOf` on key rows, name on OSS card | card headline                     | headline      | title line, page `<title>` + meta |
| `pitch` / `groupPitch` | `pitchOf` after the title on key rows   | card body                         | —             | lead paragraph, meta description  |
| `body`                 | —                                       | —                                 | —             | full text                         |
| `stats`                | `statsLine`, OSS headline figure        | accent pills, OSS headline figure | —             | `StatTile` grid                   |

## Selection flags — never positions

`highlight` (the CV row for a client), `group` (folds missions into one row,
dates derived from the whole group), `cv` (the print subset of hobbies and
testimonials), `education`, `openSource`, `personal` (kept in the data, never
counted as professional experience — a work-history parser would read Pékin
Express as a job), `wip`.

Nothing is ever selected by `slice(0, n)` or index arithmetic: a flag survives
a reordering, a position does not.

## Translation

Every prose field is `Localized<T>` — a plain value _is_ English, or
`{ en, fr }`. Bodies are split at their `hr` into `body.en` / `body.fr` by
`scripts/generate-content-indexes.mjs` at build time. Entries are resolved to
one language **in the route loader** (`localizeResumeItem`), so components read
plain strings.

Deliberately never translated: figures, proper nouns (`Next.js`, `Issue #1`),
`company`, `hashtags`, and the job titles the French market itself uses in
English (`Lead Front-End Developer`, `Full-Stack Developer`). Roles that are
genuinely French are (`University Lecturer` → _Enseignant vacataire_).

**When you change an English body, change the French one in the same edit.** A
translation cannot be derived, so it drifts silently; the detector is the
FR/EN word-count ratio per file (normal range 1.1–1.3×).
