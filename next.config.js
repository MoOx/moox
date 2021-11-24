const path = require("path");
const bsconfigJson = require("./bsconfig.json");
const packageJson = require("./package.json");
const modulesToTranspile = [
  // rescript & rescript deps
  "rescript",
  ...bsconfigJson["bs-dependencies"],
  ...Object.keys(packageJson.dependencies).filter((dep) =>
    dep.startsWith("react-native"),
  ),
];
const withTM = require("next-transpile-modules")(modulesToTranspile);

const config = {
  env: {
    ENV: process.env.NODE_ENV,
  },
  target: "serverless",

  // rescript
  pageExtensions: ["jsx", "js", "bs.js"],

  webpack5: true,
  webpack: (config, options) => {
    if (!options.isServer) {
      // packages used for SSR only are skipped
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }

    // react-native-web
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];

    // avoid duplicated react
    // config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');

    return config;
  },
};

module.exports = withTM(config);
