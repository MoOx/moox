// Metro config for the native half of this project.
//
// CommonJS in a `"type": "module"` repo, hence `.cjs`. TypeScript was the
// obvious choice and does not work: every Expo config file (this one,
// `app.config.*`, the config plugins) is loaded through `@expo/require-utils`,
// which strips types with `mode: "transform"`, and Node 26 removed that mode
// (`The property 'options.mode' must be one of: 'strip'`). A `.ts` config
// therefore fails to load on the machine this is developed on, before Metro
// even starts. `.cjs` is loaded by `require`, which has no such problem, on any
// Node.
//
// What is NOT here any more, since the Expo project moved to the repo root:
// `watchFolders`, `disableHierarchicalLookup`, `nodeModulesPaths` and
// `extraNodeModules`. They existed only because the app lived in `mobile/` and
// reached across a package boundary into `../src`, with its own `node_modules`
// pinned differently. One project, one dependency tree, none of it needed.
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Generated or web-only trees Metro has no business watching. `dist/` and
// `.tanstack/` are build output (tens of thousands of files), `ios/` holds Pods
// and build artefacts, and `public/content/` is the compiled markdown the app
// fetches over the network rather than bundles.
//
// Every pattern is anchored on the project root, and that is the whole trick:
// an unanchored `/\/dist\//` also matches `node_modules/whatwg-fetch/dist/`,
// which is where `react-native`'s fetch polyfill lives. Metro then reports it
// as a package whose `main` field points at a file that does not exist, and the
// bundle fails on a module nobody here imports directly.
const root = __dirname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

config.resolver.blockList = [
  new RegExp(`^${root}/dist/`),
  new RegExp(`^${root}/dist-(ios|android)/`),
  new RegExp(`^${root}/\\.tanstack/`),
  new RegExp(`^${root}/ios/(Pods|build)/`),
  new RegExp(`^${root}/public/content/`),
];

module.exports = config;
