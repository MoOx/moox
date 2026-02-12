import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";
import reactNativeWeb from "vite-plugin-react-native-web";
import tsConfigPaths from "vite-tsconfig-paths";

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

// Esbuild plugin to stub react-native/Libraries/* deep imports
// These are native-only and don't exist in react-native-web
const stubReactNativeInternals = {
  name: "stub-react-native-internals",
  setup(build: { onResolve: Function; onLoad: Function }) {
    build.onResolve({ filter: /^react-native\/Libraries\// }, () => ({
      path: "rn-stub",
      namespace: "rn-stub",
    }));
    build.onLoad({ filter: /.*/, namespace: "rn-stub" }, () => ({
      contents: "export default undefined; export {}",
      loader: "js" as const,
    }));
  },
};

export default defineConfig({
  server: {
    port: 1337,
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      srcDirectory: "src",
      router: { routesDirectory: "app" },
      // spa: { enabled: true },
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
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
        "react-native-svg",
        "react-native-reanimated",
        "react-native-safe-area-context",
        "react-native-gesture-handler",
        "react-native-worklets",
        "@react-native-clipboard/clipboard",
        "@react-native-async-storage/async-storage",
      ],
      esbuildOptions: {
        mainFields: ["module", "main"],
        resolveExtensions: rnwWebExtensions,
        plugins: [stubReactNativeInternals],
      },
    },
  },
});
