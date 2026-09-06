import fs from "node:fs";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";
import reactNativeWeb from "vite-plugin-react-native-web";

const rnwWebExtensions = [
  ".web.mjs",
  ".web.js",
  ".web.jsx",
  ".web.ts",
  ".web.tsx",
  ".mjs",
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".json",
];

const RN_STUB_ID = "\0rn-stub";

// Rolldown plugin to stub react-native/Libraries/* deep imports
// These are native-only and don't exist in react-native-web
const stubReactNativeInternals = {
  name: "stub-react-native-internals",
  resolveId: {
    filter: { id: /^react-native\/Libraries\// },
    handler: () => RN_STUB_ID,
  },
  load: {
    filter: { id: new RegExp(`^${RN_STUB_ID}$`) },
    handler: () => "export default undefined; export {}",
  },
};

// The app landing pages that are still plain static HTML in `public/apps/*/`
// (they predate the site and keep their own standalone design). A static host
// resolves `/apps/lifetime/` to that directory's `index.html`, but the dev
// server does not: Vite's public middleware has no directory index, so the
// request falls through to the router, which strips the trailing slash and
// answers 404. This rewrite gives dev the same URLs as production.
//
// Only for the slugs that still have such a file: `/apps/<slug>` is a route
// now (see `src/app/apps.$slug.tsx`), and rewriting it here would answer it in
// dev with an `index.html` that does not exist.
const staticAppPages = fs.existsSync("public/apps")
  ? fs.readdirSync("public/apps").filter((slug) => fs.existsSync(`public/apps/${slug}/index.html`))
  : [];

const serveAppPagesInDev = {
  name: "serve-app-pages-in-dev",
  apply: "serve" as const,
  configureServer(server: { middlewares: { use: (fn: unknown) => void } }) {
    server.middlewares.use((req: { url?: string }, _res: unknown, next: () => void) => {
      const slug = req.url?.match(/^\/apps\/([\w-]+)\/?(?:$|\?)/)?.[1];
      if (slug !== undefined && staticAppPages.includes(slug)) req.url = `/apps/${slug}/index.html`;
      next();
    });
  },
};

// The app pages: the index, one page per entry of the registry, and its
// privacy policy. `/apps` is in the menus, so a crawl would find the rest -
// listing them is what keeps a policy prerendered even if a link ever moves,
// and that URL is the one the two stores were given.
const appRegistry = JSON.parse(fs.readFileSync("content/apps.json", "utf8")) as {
  apps: Array<{ slug: string }>;
};

export default defineConfig({
  server: {
    port: 1337,
  },
  preview: {
    host: "127.0.0.1",
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    serveAppPagesInDev,
    tanstackStart({
      srcDirectory: "src",
      router: { routesDirectory: "app" },
      pages: [
        { path: "/apps" },
        ...appRegistry.apps.flatMap((app) => [
          { path: `/apps/${app.slug}` },
          { path: `/apps/${app.slug}/privacy` },
        ]),
      ],
      // spa: { enabled: true },
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        crawlLinks: true,
        failOnError: true,
        filter: (page) => !page.path.match(/\.(pdf|zip|vcf|xml|ico|txt|json)$/),
      },
    }),
    viteReact(),
    reactNativeWeb(),
    cjsInterop({
      dependencies: ["inline-style-prefixer", "inline-style-prefixer/**"],
    }),
  ],
  ssr: {
    noExternal: [
      "react-native",
      "react-native-web",
      "react-native-svg",
      "react-native-reanimated",
      "react-native-safe-area-context",
      "react-native-gesture-handler",
      "react-native-worklets",
      "@react-native-async-storage/async-storage",
      "@react-native-clipboard/clipboard",
    ],
    optimizeDeps: {
      exclude: ["react", "react-dom"],
      include: [
        // `react-native-web` MUST be prebundled on the server too. Every other
        // entry below imports `react-native` (aliased to `react-native-web`),
        // so leaving it out gives the SSR graph two instances of it: the one
        // bundled inside these optimized deps, and the one Vite transforms for
        // app code. `StyleSheet.create` registers styles in a module-level
        // WeakMap, so a style object created by instance A is invisible to
        // instance B: `StyleSheet.absoluteFill` handed to a react-native-svg
        // `<Svg>` came out as an inline style server-side and as an atomic
        // className client-side, i.e. a hydration mismatch on every gradient.
        "react-native-web",
        "react-native-svg",
        "react-native-reanimated",
        "react-native-safe-area-context",
        "react-native-gesture-handler",
        "react-native-worklets",
        "@react-native-clipboard/clipboard",
        "@react-native-async-storage/async-storage",
      ],
      rolldownOptions: {
        resolve: {
          mainFields: ["module", "main"],
          extensions: rnwWebExtensions,
        },
        plugins: [stubReactNativeInternals],
      },
    },
  },
});
