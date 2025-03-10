import type { NextConfig } from "next";

import packageJson from "./package.json" with { type: "json" };

const transpilePackages = [
  // react-native packages
  "react-native",
  ...Object.keys(packageJson.dependencies).filter(
    (dep) => dep.startsWith("react-native") || dep.startsWith("@react-native")
  ),
];
const nextConfig: NextConfig = {
  transpilePackages,

  env: {
    ENV: process.env.NODE_ENV,
  },
  /*
  experimental: {
    turbo: {
      rules: {
        "*.(js|jsx|ts|tsx)": {
          loaders: [
            // react-native packages requires often global __DEV__ constant
            {
              loader: "string-replace-loader",
              options: {
                search: "__DEV__",
                replace:
                  process.env.NODE_ENV !== "production" ? "true" : "false",
              },
            },
          ],
        },
      },
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
  },
  */
  webpack: (config, { webpack }) => {
    // react-native packages requires often global __DEV__ constant
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV === "production" || true,
      })
    );

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

    return config;
  },
};

export default nextConfig;
