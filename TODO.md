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

## 4. HTML & styling cleanup (cross-platform)

Diagnosis, measurements and the reasoning behind the order live in
`HTML-STYLING-PROPOSAL.md`. Step 0 is done (commit `pin styles`). Steps 1 and 2
are where the DOM win is and need no library decision; step 3 is the library
decision itself.

Corrected target, measured rather than projected: the earlier "−400/−500
elements on `/resume`" for step 1 was wrong. The removable Spacer + Container
population there is ~105, and both mechanical routes to it regress layout (see
below). The bulk of the win was in step 2 instead.

- [x] **Step 1 — spacing as props.** `Box` (`p`/`px`/`py`/`gap`) replaced
      `SpacedView` at 121 call sites; `SpacedView` is deleted. Ergonomics only:
      the DOM did not move (1307 → 1306 on `/`).
      Tried and reverted, both caught by `npm run visual`:
      **Container two nodes → one** (8 captures regressed — the wrapper's
      padding applies outside `maxWidth`, and its `overflow: hidden` is what
      stops decorative overflow widening the document on a phone);
      **folding `<Spacer>` into the next element's `marginTop`** (4 captures
      regressed — removing a child from a parent that has a `gap` removes a gap
      too, so the two are not equivalent).
- [ ] **Spacers, what is left of step 1.** Max's call, 2026-08: **the home
      page's vertical rhythm stays exactly as it is** (80/24/48/32/48/48px), so
      no normalising them into a single parent `gap`. Each remaining `Spacer`
      has to be folded individually, checking the parent's flex direction and
      whether it has a `gap`. ~65 sites for ~90 nodes a page; low value per
      unit of risk, so it is not next.
- [x] **Step 2a — links are one element.** `LinkText` renders a single node:
      `useLinkProps` supplies the router's href and click handling as plain
      props, and react-native-web's `<Text href>` renders the anchor with the
      styles compiled to classNames. `TextUnderlined` and its per-link
      `useFocus` are gone, replaced by a `:focus-visible` / `:hover` rule.
      Measured: `/resume` 3122 → 2925, `/` 1306 → 1249, `/contact` 641 → 590;
      anchors wrapping a lone text node 182 → 0; max depth 26 → 25.
- ~~**Step 2b — semantic primitives.**~~ **Dropped, Max, 2026-08.** `role=` on
  a `View` is fine as it is: react-native-web already maps it to the real
  tag (`<h3>`, `<nav>`, `<p>`, `<ul>`, `<article>`…), so the markup is
  already semantic and a `Heading` / `Paragraph` layer would only rename the
  call sites. The node win was in 2a and is banked.
  Consequence for `HTML-STYLING-PROPOSAL.md` §4: the "react-strict-dom
  interface, hand-rolled" argument goes with it. If RSD ever ships, the
  adapter gets written then.
- [ ] **Step 3 — font ergonomics, then one token object.** The theme mechanism
      stays (CSS variables for a reliable `auto`, OS scheme on native); only the
      call sites change. Delete `fontStyles.android` / `androidEm` (0 uses,
      ~120 dead lines), flatten the `ios` / `iosEm` namespace, and pair type
      with colour in one registered helper — `text("title2", "text", "bold")`
      instead of `[fontStyles.iosEm.title2, theme.styles.text, {fontWeight}]`
      (207 call sites). **After step 2**, since the primitives absorb most of
      them. Then collapse `theme.styles` / `dynamicColors` / `colors` into one
      token object (colour **and** space, radius, type), which lets `useTheme()`
      leave most of its 58 components.
- [ ] **Step 4 — responsive without duplication.** `IfWindowWidthIs` (20 uses)
      renders both branches into the HTML. If only styling differs it must be
      one node; keep the component only where the children genuinely differ.
- [ ] **Invert the `AGENTS.md` styling rules** once step 1 lands — "prefer
      inline styles" and "prefer SpacedView over padding" are what produced
      both problems.
- [ ] Verify every step with the screenshot harness described in the proposal
      (full-page 390/1280 pixel diff; heights must not move).

---

## 5. Expo app — polish, if it is worth continuing

The site boots and renders every route on iOS and Android from the same `src/`
(see `MOBILE.md` for how, and `npm run test:native` for the proof). Nothing
below blocks a demo; all of it is the difference between "opens" and "looks
right".

- [ ] Review the layout on a real device. Every route renders, which is not the
      same claim as every route looking correct.
- [ ] Parallax is static on native, and its animated path is switched off
      there entirely (`animate` in `Parallax.tsx`) because the worklet cannot
      run on the UI runtime: it calls `layoutToInputRange` and
      `getTransformValue`, and the latter runs `ts-pattern`'s `match()`.
      Making it move is two jobs, not one: move that work out of the worklet
      (resolve the input range and the transform shapes at render time, leave
      only `interpolate` inside), and wire `useScrollViewOffset` to the root
      `ScrollView` so there is an offset to interpolate against.
- [ ] `GlassView` / `BlurView` are a plain `View` on native (they are built on
      CSS `backdrop-filter`). `expo-blur` and `expo-glass-effect` both ship in
      Expo Go.
- [ ] No native back gesture: navigation is TanStack's memory history, not a
      native stack. An Android hardware-back handler is the minimum.
- [ ] `/talks` embeds link out instead of playing inline; `react-native-webview`
      is in Expo Go if inline playback is wanted.
- [ ] TestFlight needs one `scripts/bootstrap-ios io.moox.site` run in the
      `certificates` repo (a Mac and an Apple account). Nothing structural: the
      distribution certificate is reused, only a profile for the new bundle ID
      is missing. The build is fastlane, not EAS, and `ios/` is committed for
      that reason.

## 6. Fallout from flattening the repo (2026-08-20)

The Expo project moved from `mobile/` to the repo root: one `package.json`, one
`node_modules`, one `tsconfig.json`, native versions aligned on what
`expo install --check` expects. `MOBILE.md` has the full account. What that left
open:

- [ ] **`Btn` reaches back into the site.** It moved to
      `react-multiversal/Btn.tsx` but still imports `useTheme` from `@/styles`,
      and reads five names from the site's colour map (`backMain`, `textOnMain`,
      `backOnAlt`, `backAlpha85`, `ultraLight`). It is the only import going
      that way. Turning it into a colour contract the kit owns is the first
      piece of the wider `react-multiversal` tidy-up, which is deliberately
      parked until there are more components to move in.
- [ ] **Nothing catches a `<div>` in shared code any more.** The jest harness
      went with the flattening (it was never run outside CI). What replaces it
      covers less: `no-restricted-globals` for the DOM globals, and
      `src/platformPairs.types.ts` for export surfaces. A ~50-line AST check
      with `oxc-parser` would close the gap without bringing jest back.
- [ ] **Node 26 breaks every TypeScript Expo config.** `app.config.ts`,
      `metro.config.ts` and TS config plugins all load through
      `@expo/require-utils`, which strips types with `mode: "transform"`, and
      Node 26 only accepts `strip`. Hence `app.json` + `.cjs` configs. Worth
      retrying when Expo updates that dependency. Unrelated but adjacent:
      `engines` says `24.x` and the machine runs 26, so `npm install` warns
      `EBADENGINE` on every run.
- [ ] **The web CI now installs Expo.** `npm ci` for a GitHub Pages build pulls
      Metro, the Expo CLI and the native packages. Acceptable, and the price of
      one dependency tree; if it ever hurts, the fix is npm workspaces, not a
      second lockfile.

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
