import type { NextConfig } from "next";
import { WebpackConfigContext } from "next/dist/server/config-shared";

import packageJson from "./package.json";

const transpilePackages = [
  // react-native packages
  "react-native",
  ...Object.keys(packageJson.dependencies).filter(
    (dep) => dep.startsWith("react-native") || dep.startsWith("@react-native")
  ),
];
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  transpilePackages,

  env: {
    ENV: process.env.NODE_ENV,
  },
  experimental: {
    viewTransition: true,
  },
  turbopack: {
    resolveAlias: {
      "react-native": "react-native-web",
    },
    resolveExtensions: [
      ".web.tsx",
      ".web.ts",
      ".web.jsx",
      ".web.js",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".mjs",
      ".json",
    ],
  },

  webpack: (config: any, { webpack }: WebpackConfigContext) => {
    config.resolve.mainFields = ["module", "main"];

    // react-native-web
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];

    // react-native packages requires often global __DEV__ constant
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV === "production" || true,
      })
    );

    return config;
  },
};

export default nextConfig;
