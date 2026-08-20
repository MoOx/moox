# The site as an Expo app

Not a port, and not a fork: **the same pages, mounted by a different router**.

`src/pages/*.tsx` holds the pages as plain components that take their data as
props. The website mounts them from `src/routes.web/**` with TanStack Start; the
app mounts them from `src/routes.native/**` with Expo Router. Neither copy of a
page exists, so the interesting part of the repo is the thin layer around them,
where the two platforms genuinely disagree.

That layer is small enough to read in one sitting, and it is the point of the
exercise.

## Run it

```sh
npm install
npm run build:native   # a development build: NativeTabs needs native code
npm run dev:native     # Metro, once the app is installed
```

Content (the résumé, blog and talks JSON) is fetched from the deployed site, so
the app needs network but no local web server. See `api.readJson.native.ts`.

## One project, not two

The app used to live in `mobile/`, with its own `package.json`, `node_modules`
and lockfile, reaching across the boundary into `../src`. That cost four Metro
settings (`watchFolders`, `disableHierarchicalLookup`, `nodeModulesPaths`,
`extraNodeModules`), a second `tsconfig` with its own exclude list, a Metro
alias shimming `@react-native-clipboard/clipboard` to `expo-clipboard`, and two
`npm install`s. All of it existed because the two halves pinned React Native
differently.

They no longer do: every native package follows what
`bundledNativeModules.json` expects, exactly where Expo pins exactly and with a
`~` where Expo allows a range, and `npm run lint:native`
(`expo install --check`) is what enforces it. `typescript` is the one entry in
`expo.install.exclude`: the site is on TypeScript 7, Expo expects 6, and that is
the site's call to make.

**Both routes directories are named, and neither is called `app`.** Expo
resolves its route tree with `getRouterDirectory()`, which returns `src/app`
when it exists and `app` otherwise, logging one grey line about it. With two
file-based routers in one project, that guess is a trap: `app.json` sets
`plugins.expo-router.root` to `./src/routes.native`, `vite.config.ts` sets
`routesDirectory` to `routes.web`.

**The Expo-side configs are `.cjs`, and that is not laziness.** The repo is
`"type": "module"`, so a `.js` config is read as ESM and `module.exports`
throws. TypeScript would be the better fix and does not work: `metro.config.*`,
`app.config.*` and the config plugins are all loaded through
`@expo/require-utils`, which strips types with `mode: "transform"`, a mode Node
26 removed. A `.ts` config fails to load before Metro starts. So: `app.json`
(static), `metro.config.cjs`, `babel.config.cjs`, `plugins/withUIScene.cjs`.

## The four differences

Everything else is shared. These four are the whole diff, and each one has a
file you can open on both sides.

### 1. The router, and what a tap means

| | site | app |
| --- | --- | --- |
| routes | `src/routes.web/**` (TanStack Start, file-based) | `src/routes.native/**` (Expo Router, file-based) |
| history | one, linear | one stack per tab, kept alive |
| a tap on a résumé card | navigates to `/resume?detail=x` and **masks** `/resume/x` over it, so a modal opens above the timeline while a share or a reload still lands on the standalone page | pushes `/resume/x` onto the tab's stack |
| going back | browser back, an Escape listener, and a `<Link>` on the backdrop | the OS edge gesture, free |

Read `src/routes.web/{-$lang}.resume.tsx` and
`src/routes.native/(tabs)/resume/index.tsx`
side by side: same page component, twenty lines of routing each, and they do
not resemble one another at all.

The shared code reaches a router through **two functions** - `usePathname` and
`useNavigateToHref`, in `src/routing.ts` and `src/routing.native.ts`. That is
the entire coupling, which is why 34 files that render links never learned
which router they are talking to.

### 2. The tab bar

The site has `WebsiteMobileMenu`: a pill of anchors in a fixed box, glass
painted with `backdrop-filter`. It is a good imitation.

`src/routes.native/(tabs)/_layout.tsx` is a real `UITabBarController` on iOS and a
`BottomNavigationView` on Android, so the liquid glass, the scroll-edge effect,
`minimizeBehavior` and the SF Symbols belong to the platform. It is also what
gives each tab its own stack.

### 3. Data

The site has route `loader`s: TanStack Start runs them **before** the
component, on the server at first paint and in the browser on a client
navigation, so a page never renders without its data and never shows a spinner.

Expo Router has no equivalent and could not usefully have one - nothing renders
the first screen ahead of time. So `src/native/query.tsx` fetches in the component
with TanStack Query, and every screen here has a real loading state its web
twin does not.

The functions being called are the same (`fetchResume`, `fetchAll`), pointed at
the deployed site by `api.readJson.native.ts`, so both platforms read the same
JSON. What the cache buys that a loader does not: `/`, `/resume` and `/cv` all
want `fetchResume`, and loaders refetch per navigation. Here it is one request,
shared between tabs, retried on a flaky connection.

### 4. Language

`/fr/resume` is an **address** on the site: shareable, indexable, advertised
with `hreflang`. So `useLang` reads it off the path and there is no state at
all (`i18n.useLang.tsx`).

An app has no address bar, nothing to index and no second URL to offer, so the
same question becomes what it always was on a device: a setting. The native
half (`i18n.useLang.native.tsx`) starts from the device locale, persists an
override, and there is no `{-$lang}` segment anywhere under
`src/routes.native`. It is
not a feature dropped in the port; it is a web mechanism with no referent here.

## What the native half is made of

| File | Why it exists |
| --- | --- |
| `index.js` | One line: `import "expo-router/entry"`. The `main` of the package. |
| `src/routes.native/**` | The route tree. Each screen is a query plus a shared page. |
| `src/native/query.tsx` | The cache and the loading states that replace the loaders. |
| `src/native/Screen.tsx` | The scroller. On the web the *document* scrolls; here somebody has to. |
| `app.json` | Name, scheme, bundle ids, and the two plugins. |
| `metro.config.cjs` | One `blockList`, anchored on the project root. Nothing else. |
| `plugins/withUIScene.cjs` | The iOS 27 SDK refuses to launch an app with no scene delegate. |
| `ios/` | The prebuilt project. Committed, and built with fastlane rather than EAS. |

**The UIScene plugin is not optional on Xcode 27.** Building against the iOS 27
SDK turns what iOS 26 only logged (`CLIENT OF UIKIT REQUIRES UPDATE`) into a
launch-time assert: with no `UIApplicationSceneManifest` in Info.plist the app
dies with *UIScene life cycle is required for apps built with this SDK* before
`didFinishLaunchingWithOptions` runs. Expo's prebuild template still emits the
pre-scene AppDelegate (expo/expo#46664), so the plugin adds the manifest and the
`SceneDelegate` it names. Two details in it are load-bearing: the window stays
owned by the AppDelegate, because React Native reads it back from there and
crashes when it is nil (react-native#53602), and the scene forwards
`openURLContexts` / `continue` to the app delegate, because deep links no longer
reach `application(_:open:options:)` and that is how expo-dev-client is handed a
bundle URL. Run `npx expo prebuild --platform ios` after touching it.

## What is checked, and what is not

`npm run test:native` is two gates, and neither of them renders anything:

- `expo install --check` compares every installed native package with what this
  Expo SDK expects. It is what keeps the alignment above from rotting.
- `scripts/check-bundle.mjs` bundles the app through a real dev server, for iOS
  and Android. `expo export` is not a substitute: in production
  `babel-preset-expo` folds `Platform.OS === "web"` to `false` and drops the
  dead branch *before* resolution, so a `node:fs` import guarded that way
  exported cleanly and crashed `expo start` on the first bundle. Two details in
  the script are load-bearing, both learned the hard way: `--clear`, because
  Metro will serve a cached bundle for an edited file, and a process-group kill,
  because `npx` spawns the real Metro as a child and a leftover server answers
  the next run with *its* graph. It refuses to run if something already holds
  the port.

**There is no longer a jest harness, and that is a real loss worth naming.** It
rendered every route through the React Native renderer, and one of its four
tests, `dom-elements`, walked the tree for host components whose names are HTML
tags. That is a class of bug nothing else here catches: the test renderer
instantiates `<div>` happily, while a device raises `Invariant Violation: View
config getter callback for component "div" must be a function` and shows a
redbox. It was dropped because it was never run outside CI, and what replaces it
is narrower:

- `no-restricted-globals` in `.oxlintrc.json`, scoped by an override to
  `*.native.*`, `*.ios.*`, `src/native/**` and `src/routes.native/**`, refuses
  `document`, `matchMedia`, `IntersectionObserver`, `getComputedStyle`,
  `localStorage`, `HTMLElement` and `Node`. That covers three of the four boot
  crashes of the port. It does not cover `<div>`.
- `src/platformPairs.types.ts` checks, at the type level, that every `.native`
  half still exports what its web twin exports. That used to be the job of a
  second `tsconfig` with `moduleSuffixes: [".native", ""]`; this is the same
  guarantee in one file and one program. It compares export *names*, not
  signatures: `react-native` and `@types/react-native-web` disagree about event
  types, so `onPointerEnter` alone makes every pressable pair structurally
  incompatible and the noise would drown the real thing.

Two classes therefore reach a device unchecked: an HTML tag in shared code, and
a worklet that throws on the UI runtime (that one aborts the process with no
redbox and nothing in the Metro console, and never had a check). See the worklet
rule in the root `CLAUDE.md`.

## Platform splits in the shared code

The website's own conventions were already in place (`IfWindowWidthIs.native.tsx`,
`responsiveStyle.native.ts`), so this follows them:

- `routing.ts` / `routing.native.ts`: the two functions above. The one file
  that decides which router the shared code talks to.
- `i18n.useLang.tsx` / `.native.tsx`: a URL segment, or a setting.
- `LinkText.tsx` / `.native.tsx`: the web half is an anchor and a click, plus
  the router preloading hooks that hang off one. The native half is a piece of
  text you can press. `LinkText.types.ts` and `LinkPress.ts` are what both
  halves share, and what keeps either router out of the other's bundle.
- `ElevatedSurface.tsx` / `.ios.tsx` / `.native.tsx`: liquid glass, a
  translucent fallback, or a tonal Material surface.
- `Image.native.tsx`: `<img>` has no native equivalent, root-relative `src`
  needs an origin, and `<Image>` cannot decode SVG (about half the site's
  images), so those go through react-native-svg's `SvgUri`.
- `ResumeEntryModal.native.tsx`: renders nothing, and still takes the props.
  The page must not have to ask which platform it is on.
- `api.readJson.ts` / `api.readJson.native.ts`: the web half reads from the
  filesystem when prerendering. A `Platform.OS` branch was not enough: Metro
  follows the `node:fs` import whether or not the branch runs.
- `clipboard.ts` / `clipboard.native.ts`: `navigator.clipboard` with a textarea
  fallback, or `expo-clipboard`. The native half used to import the community
  module and be aliased to `expo-clipboard` by a Metro `resolveRequest`; the
  package is simply gone now, and the alias with it.

**Every pair belongs in `src/platformPairs.types.ts`**, which is what checks
that the native half still exports what the web half does. A pair that is not
listed there is not checked by anything.

Everything else is a `Platform.OS === "web"` branch at the point where the
web-only thing happens: JSON-LD `<script>` tags, `<style>` injection, print CSS,
`clipPath`, CSS `filter`, and the `<iframe>` embeds.

## Not done

- `Parallax` renders its resting position: its animated path is off on native,
  because the worklet calls plain module functions and `ts-pattern`'s `match()`,
  none of which exist on the UI runtime. Leaving it on aborted the process on
  every page (the footer renders one). See TODO.md §5.
- The home page still hides most of its blocks behind `Platform.OS === "web"`.
  That predates this port and is worth revisiting now that the shell is native.
- Language cannot be changed from inside the app yet: `useSetLang` exists and
  nothing calls it. On the site that control lives in `WebsiteMenu`, which is
  built on DOM measurement and does not run here.
- Layout has not been reviewed on a real device. Every route renders, which is
  a different claim from every route looking right.
