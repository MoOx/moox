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
    tanstackStart({
      srcDirectory: "src",
      router: { routesDirectory: "app" },
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
