# HTML & styling — where the weight actually is

A measured diagnosis of the site's DOM and styling layer, and a staged plan to
clean it up **without losing React Native compatibility**, so the same source
can ship as an Expo app.

Written 2026-08-09. Everything below is measured on a production build
(`npm run build`, served from `dist/client`, Chromium 1280×900), not estimated.
Open items derived from this document live in `TODO.md` §4, per the repo rule
that checkboxes belong there.

---

## 1. The measurements

| Page       | Elements in `<body>` | Max depth | Visible text | Markup | Markup / text |
| ---------- | -------------------- | --------- | ------------ | ------ | ------------- |
| `/`        | 1 307                | 26        | 4.3 KB       | 260 KB | **60×**       |
| `/resume`  | 2 828                | 19        | 16.9 KB      | 508 KB | **30×**       |
| `/contact` | 641                  | 19        | —            | —      | —             |

Counted by the browser, so `Nodes` from the CDP performance domain runs higher
(3 725 on `/resume` — it counts text nodes too).

Where the nodes go, on `/resume`:

- **503** elements (18%) have exactly one child and nothing else — pure wrappers.
- **218** of those are `<div>` with no `role` and no `style`: they exist only to
  hold one other `<div>`. 14.3 KB of tags for zero meaning.
- **182 of the 198 `<a>`** wrap a single `<div dir="auto">` — the anchor and its
  label are two elements instead of one.
- Chains of single-child `<div>` run **up to 5 deep** (on `/`).
- **542** nodes carry `dir="auto"` (every `<Text>`).

And where the bytes go, on `/resume`:

- **1 922 of 2 828 elements (68%) carry an inline `style` attribute** — 188.5 KB.
- Those 1 922 style attributes hold only **261 distinct declaration sets**:
  a **7.4× duplication factor**.
- Atomic classNames, by contrast, account for only 34.5 KB.

The most repeated inline declarations tell the whole story:

```
450x  letter-spacing:0px          ← fontStyles, a plain object
283x  font-size:12px              ← idem
196x  margin-top:0px              ← SpacedView with no `vertical` prop
197x  text-decoration-line:none   ← TextUnderlined, on every link
198x  color:inherit               ← LinkText's reset, flattened for <Link>
```

### Why: react-native-web only makes a class out of a style it registered

RNW keeps a `WeakMap` of every object passed through `StyleSheet.create`
(`staticStyleMap`, `dist/exports/StyleSheet/index.js`). A style it recognizes
becomes an atomic className. Anything else — an object literal, an object
returned by a function during render — is serialized into the `style`
attribute of every node that uses it.

The codebase does the second thing almost everywhere, and by convention:
`AGENTS.md` says *"Prefer inline styles"*. `fontStyles` is built with
`Object.fromEntries`, so it is a plain object. `SpacedView` calls
`spaceStyleVertical(vertical)`, which builds a fresh object per render. There
are **307** `style={{…}}` literals in `src/`.

### The part that surprised me: this costs almost nothing over the wire

I registered the obvious ones (fonts, spacing, underline) and rebuilt:

| Metric (`/resume`)   | Before   | After     |          |
| -------------------- | -------- | --------- | -------- |
| Inline-styled nodes  | 1 922    | 1 274     | −34%     |
| Inline style bytes   | 188.5 KB | 126.5 KB  | −33%     |
| className bytes      | 34.5 KB  | 60.3 KB   | +75%     |
| **HTML file, raw**   | 665.1 KB | 624.8 KB  | **−6%**  |
| **HTML file, gzip**  | 105.6 KB | 106.1 KB  | **+0.5%** |
| Style recalc, median | 144.2 ms | 150.1 ms  | noise    |

**Gzip already deduplicates repeated inline styles.** So "reduce the HTML" is
not, in this codebase, a transfer-size problem — and the inline styles are not
a runtime performance problem either. Style recalc did not move.

That reframes the goal correctly:

> The problem is not bytes. It is **element count, nesting depth, and whether
> the markup reads like something a person wrote on purpose** — which is what a
> reviewer sees when they open devtools, and what Lighthouse measures. Neither
> is affected by gzip, and neither is fixed by changing styling library.

For scale: Lighthouse flags DOM size past ~1 400 nodes; `/resume` is at 2 828
elements, and its style-recalc (144 ms) and layout (152 ms) are far past the
40 ms that Lighthouse 13's "Optimize DOM size" insight triggers on.

---

## 2. Three separate problems

They are usually discussed as one ("the HTML is heavy"). They have different
causes and different fixes, and **only one of them is a styling-library
question**.

### A. Styles serialized per node

Cause: nothing is registered. Fix: register. No library needed, no API change.
Worth doing — devtools become readable, and it is a precondition for any
theming refactor — but do not expect a performance win.

### B. Nodes that exist only to carry a style

This is the real one, and it is entirely self-inflicted — a consequence of the
component API, not of React Native:

| Component        | Uses | Cost                                                        |
| ---------------- | ---- | ----------------------------------------------------------- |
| `SpacedView`     | 121  | one `<div>` whose only job is padding                        |
| `Spacer`         | 77   | one **empty** `<div>` whose only job is to be 24px tall      |
| `Container`      | 31   | **two** nested `<div>` (wrapper + max-width box)             |
| `LinkText`       | ~200 | `<a>` + inner `<div dir="auto">` (+ a `useFocus` hook each)  |
| `IfWindowWidthIs`| 20   | a `display:contents` wrapper — **and both branches in the HTML** |

`AGENTS.md` currently mandates this: *"Avoid styles properties like margin and
padding and prefer components dedicated for this like Space or SpacedView."*
That rule is what produces the wrapper chains. It should be inverted.

### C. No semantic layer

Everything is a `View` or a `Text`, and semantics are retrofitted with `role`
(35 `role="heading"`, 17 `role="paragraph"`, 15 `role="listitem"`…). RNW does
map those to real tags — the site genuinely emits `<h1>`, `<nav>`, `<p>`,
`<ul>`, `<article>` — so the output is more correct than it looks. But the
*authoring* experience is backwards: you write `<View role="heading"
aria-level={3}>` and hope.

---

## 3. What each candidate actually fixes

| | A. inline styles | B. node count | C. semantics | Native | Risk here |
|---|---|---|---|---|---|
| **RNW + `StyleSheet` discipline** | ✅ | ➖ | ➖ | ✅ | none |
| **Component API rework** (`Box`, spacing props) | ➖ | ✅✅ | ➖ | ✅ | low, mechanical |
| **react-native-unistyles 3** | ✅✅ | ❌ | ❌ | ✅ | Babel plugin ↔ Vite |
| **react-strict-dom** | ✅✅ | ✅ | ✅✅ | ✅ | not shippable (below) |
| **Tamagui / NativeWind** | ✅ | ➖ | ➖ | ✅ | large, opinionated |

The important line in that table: **Unistyles does not reduce the DOM.** It
still renders through react-native-web — every `View` is still a `<div>`, every
`Text` is still a `<div dir="auto">`. What it changes is *where the styles go*
(classNames + CSS variables instead of inline) and *how you write them*. It is
the right answer to "my theme system is questionable" and "inline styles aren't
great". It is not an answer to "my HTML is too deep".

### react-strict-dom: you read it right

- Last npm release: **`0.0.55`, 2026-01-09** — seven months ago, still `0.0.x`.
- The repo is not dead (commits through 2026-06-23, incl. a Vite integration),
  but nothing has shipped to npm since January.
- It is the only option that fixes A, B **and** C at once, and its author is
  the author of react-native-web.

Verdict: **right idea, wrong time.** Do not bet a job-search portfolio on an
unreleased `0.0.x`. But design toward it — see step 2 — so that adopting it
later is a swap of one adapter file, not a rewrite.

### One more thing worth knowing

React Native for Web is widely reported to have entered **maintenance mode**:
no major features planned, its author now working on react-strict-dom. Nothing
breaks tomorrow, and it remains the pragmatic choice, but it argues for keeping
the RNW surface area you depend on small and behind your own primitives —
which is exactly what step 2 proposes.

---

## 4. The plan

Ordered by *value per unit of risk*. Steps 1 and 2 are where the DOM win is,
and neither requires picking a library — so the library decision can wait.

### Step 0 — register the styles *(done, measured, revertible)*

`fontStyles` through `StyleSheet.create`; the spacing helpers memoized per
value and registered; `TextUnderlined`'s decoration as a static style. ~40
lines, `tsc` clean, one fewer lint warning than before.

Verified with `npm run visual` (added in the same commit) over all 20 captures
— every route, EN and FR, at 390 and 1280:

- **every page identical in height**, so nothing in the layout moved;
- 14 of 20 captures pixel-identical, 5 within run-to-run noise (≤0.003%);
- `/blog` at 1280 showed 10.8%, which is the parallax blind spot documented in
  the script: measuring `getBoundingClientRect()` of the region at scroll 0 in
  both builds gives byte-identical geometry (`399,2171 482x28`, `fs=22px`,
  `lh=28px`), so the difference is where Chromium's stitching left the
  parallax transform, not the render;
- **`/cv` and `/fr/cv` pixel-identical**, which is what matters for the PDFs —
  they do not need regenerating (qpdf and Chrome are not available in this
  container, so the export itself was not re-run).

It also removes a genuine bug: `spaceStyleVertical(undefined)` returned
`{ marginVertical: 0 }`, so **196 nodes on `/resume` shipped four
`margin: 0px` declarations that did nothing**.

### Step 1 — spacing becomes props, not components

Delete `SpacedView` and `Spacer`. Add one primitive:

```tsx
// Box = View + spacing props resolving to registered styles
<Box p="m" gap="xxs" style={styles.card}>…</Box>
```

Today, a card is two nodes:

```tsx
<View style={{ borderRadius, overflow: "hidden" }}>
  <SpacedView horizontal="m" vertical="m" gap="xxs" style={{ flexGrow: 1 }}>
```

Because padding lives on a *different component* than the border-radius, every
styled box costs a wrapper. With spacing as props, it is one node.

`<Spacer size="l" />` — 77 empty `<div>` — becomes `gap` on the parent.
`gap` is supported on iOS and Android since RN 0.71, so this is not a web-only
move. The handful of `<IfWindowWidthIs><Spacer/></IfWindowWidthIs>` become a
responsive `gap` (step 3).

`Container` collapses from two nodes to one:
`{ width: "100%", maxWidth, marginHorizontal: "auto" }` — Yoga supports `auto`
margins, so it works on native too. Keep a `bleed` escape hatch for the
handful of uses that need the outer `overflow: hidden`.

Expected: **−400 to −500 elements on `/resume`**, −100 on `/`, with no visual
change.

### Step 2 — a thin semantic layer (~150 lines, no dependency)

Stop writing `role` at call sites. Write the eight primitives the site actually
uses, and let them decide per platform:

```tsx
// primitives/Text.tsx
export const Heading = ({ level, ...p }) => …  // <h1>-<h6> on web, <Text> + a11y on native
export const Paragraph = …                     // <p>          / <Text>
export const List / ListItem = …               // <ul>/<li>    / <View role>
export const Link = …                          // <a>          / <Text onPress>
```

Two properties matter:

1. **It is the react-strict-dom interface, hand-rolled.** If RSD ships, this
   file is what you replace — nothing else. If it never ships, you lose
   nothing.
2. **It is the demo.** For a job search, "I wrote the cross-platform primitive
   layer, here is the file" reads considerably better than "I added a
   dependency".

Fold `LinkText` into it while you are there: when the child is a string, put
the text styles **on the anchor** instead of a nested text node — that is
**−182 elements on `/resume` alone**. And replace `useFocus` (a hook with four
DOM listeners, running ~200× per page) with a `:focus-visible` CSS rule on web,
keeping the hook only for native.

### Step 3 — the theme, and only then the library question

The current `makeTheme` already does the clever part: on web it emits CSS
variables and hands components `var(--…)` strings, so a theme switch costs no
React render. Keep that idea. What is wrong is the surface:

- Four ways to reach a colour — `theme.styles` (184 uses),
  `theme.dynamicColors` (104), `theme.colors` (15), `theme.mode` (4) — where
  the difference (literal vs `var(--…)`) is an implementation detail that
  leaked into every component.
- `useTheme()` in **58 components**, subscribing each of them to a store, to
  produce values that on web are constant strings.
- Only colours are themed. Spacing lives in `react-multiversal/index.ts`, type
  in `font.ts`, radii nowhere. There is no single token object.

Two ways forward:

**(a) `react-native-unistyles` 3.3** — active (3.3.0, 2026-07-10), themes as
CSS variables on web out of the box, breakpoints *inside* the stylesheet,
variants, no `useTheme()` in components, no re-render on theme change. It is
the answer a reviewer will recognise.
Risk to check first: Unistyles 3 **requires its Babel plugin**, and this
project builds with Vite + TanStack Start + prerender, not Metro. Vite support
is not documented (`vite-plugin-babel` is the reported path). `vite.config.ts`
already carries scar tissue about duplicate RNW instances breaking
`StyleSheet.create` registration across the SSR boundary — the same class of
problem. **Spike it on a branch before committing.** It also pulls in Nitro
Modules / New Architecture on the native side (fine for a fresh Expo app).

**(b) Home-grown `makeStyles(tokens => …)`, ~60 lines.** On web, theme values
are already constant `var(--…)` strings, so a stylesheet built from them is
*static* and can be registered once, globally, with no hook at all. On native,
build two and pick by mode. That is 80% of Unistyles' theming value, using
infrastructure this repo already has, with zero risk to the build pipeline —
and one token object (`space`, `radius`, `color`, `font`) instead of four
accessors.

My recommendation: **(b) first**, because it is a two-hour change that
immediately removes 58 `useTheme()` calls and unifies the tokens, and because
it keeps the Vite pipeline untouched while steps 1–2 are landing. Re-evaluate
(a) once the component API is stable — at that point Unistyles is a mechanical
swap, and you will know whether you actually miss variants and stylesheet
breakpoints.

### Step 4 — responsive without duplicating the DOM

`IfWindowWidthIs` renders **both** branches into the HTML and hides one with a
`display: none !important` media query. That is a wrapper node plus a duplicated
subtree per use, 20 times. The codebase has already been bitten by it twice —
`BlockHey` and the `/resume` hero both carry comments about the page shipping
the `<h1>` twice.

The rule to adopt: **if only the styling differs, it must be one node.** Media
queries on web, `useWindowDimensions` on native, behind one `useBreakpoint()`
or Unistyles breakpoints. Reserve `IfWindowWidthIs` for the cases where the
*children themselves* differ — and treat each remaining use as a design smell.

### Step 5 — the Expo app

After steps 1–3 the app is mostly a matter of `app.json`, a Metro config and
swapping the router. The things that would block it today are already
enumerated: `Platform.OS === "web"` appears in only **6 files**, and the
web-only CSS in styles (`clamp()`, `backgroundClip: text`, `position: fixed`,
`viewTransitionName`, `env()`, `backdropFilter`, `objectFit`) is concentrated
in gradients, `Image`, and the header. Each has a native equivalent
(`react-native-svg` masks, `expo-blur`, `resizeMode`); none is load-bearing for
layout.

---

## 5. What not to do

- **Do not adopt react-strict-dom now.** Design toward it (step 2), adopt it
  when it releases a `0.1`.
- **Do not expect a styling library to shrink the DOM.** Unistyles, Tamagui and
  NativeWind all render through RNW. Only fewer components do that.
- **Do not chase HTML bytes.** Gzip already ate that problem; measured above.
- **Do not do steps 1–2 and 3 in the same pass.** One changes structure, the
  other changes styling. Mixing them makes the screenshot diff useless — and
  the screenshot diff is the only thing standing between this refactor and a
  regression on a site whose visual result is its main asset.

## 6. Target

| | Now | After steps 1–2 | |
| --- | --- | --- | --- |
| `/resume` elements | 2 828 | ~1 900 | −33% |
| `/` elements | 1 307 | ~1 050 | −20% |
| Max depth (`/`) | 26 | ~18 | |
| `useTheme()` call sites | 58 | 0 | after step 3 |
| `style={{…}}` literals | 307 | ~80 | |
| Deleted components | — | `SpacedView`, `Spacer`, `TextUnderlined` | |

Each step is independently shippable and independently verifiable:

```sh
npm run dev
npm run visual -- --save=before     # on the base commit
npm run visual -- --save=after      # after the change
npm run visual -- --diff=before,after
```

Heights must not move. That is the contract for every step below — a site whose
visual result is its main asset does not get refactored on "looks fine to me".
