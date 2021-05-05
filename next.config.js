const path = require("path");
const bsconfigJson = require("./bsconfig.json");
const packageJson = require("./package.json");
const modulesToTranspile = [
  "rescript",
  ...bsconfigJson["bs-dependencies"],
  ...Object.keys(packageJson.dependencies).filter((dep) =>
    dep.startsWith("react-native"),
  ),
];
// const withTM = require("next-transpile-modules")(modulesToTranspile);

const config = {
  env: {
    ENV: process.env.NODE_ENV,
  },
  target: "serverless",

  // bs-platform
  pageExtensions: ["jsx", "js", "bs.js"],

  webpack: (config, options) => {
    if (!options.isServer) {
      // We shim fs for things like the blog slugs component
      // where we need fs access in the server-side part
      config.node = {
        fs: "empty",
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

    // logic below for externals has been extracted from "next-transpile-modules"
    // we won't use this modules as they don't allow package without "main" field...
    // https://github.com/martpie/next-transpile-modules/issues/170
    const getPackageRootDirectory = (m) =>
      path.resolve(path.join(__dirname, "node_modules", m));
    const modulesPaths = modulesToTranspile.map(getPackageRootDirectory);

    const hasInclude = (context, request) => {
      return modulesPaths.some((mod) => {
        // If we the code requires/import an absolute path
        if (!request.startsWith(".")) {
          try {
            const moduleDirectory = getPackageRootDirectory(request);
            if (!moduleDirectory) return false;
            return moduleDirectory.includes(mod);
          } catch (err) {
            return false;
          }
        }
        // Otherwise, for relative imports
        return path.resolve(context, request).includes(mod);
      });
    };
    config.externals = config.externals.map((external) => {
      if (typeof external !== "function") return external;
      // if (isWebpack5) {
      //   return async ({ context, request, getResolve }) => {
      //     if (hasInclude(context, request)) return;
      //     return external({ context, request, getResolve });
      //   };
      // }
      return (context, request, cb) => {
        return hasInclude(context, request)
          ? cb()
          : external(context, request, cb);
      };
    });

    config.module.rules.push({
      test: /\.js$/,
      use: options.defaultLoaders.babel,
      include: modulesPaths,
    });

    // {
    //   test: /\.bs\.js$/,
    //   use: options.defaultLoaders.babel,
    //   include: /node_modules/,
    // },

    // avoid duplicated react
    // config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');

    return config;
  },
};

// module.exports = withTM(config);
module.exports = config;
