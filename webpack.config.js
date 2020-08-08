// @flow

import defaultWebpackConfig from "@phenomic/plugin-bundler-webpack/lib/webpack.config.js";

module.exports = (config /*: PhenomicConfig*/) => {
  const webpackConfig = defaultWebpackConfig(config);
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [
        // ...webpackConfig.module.rules,
        // reuse phenomic default babel loader and add react-native(-web) alias
        // to our code
        {
          ...webpackConfig.module.rules[0], // ≈ babel-loader
          exclude: [/node_modules/, /\.bs\.js$/],
          use: [
            {
              ...webpackConfig.module.rules[0].use[0],
              options: {
                ...webpackConfig.module.rules[0].use[0].options,
                plugins: [
                  [
                    "babel-plugin-module-resolver",
                    { alias: { "^react-native$": "react-native-web" } },
                  ],
                ],
              },
            },
          ],
        },
        // reuse phenomic default babel loader and add react-native(-web) alias
        // to node_modules using react-native
        {
          ...webpackConfig.module.rules[0], // ≈ babel-loader
          exclude: undefined,
          include: [/node_modules\/react-native-.*/, /.*\.bs\.js$/],
          use: [
            {
              ...webpackConfig.module.rules[0].use[0],
              options: {
                plugins: [
                  [
                    "babel-plugin-module-resolver",
                    { alias: { "^react-native$": "react-native-web" } },
                  ],
                ],
              },
            },
          ],
        },
        webpackConfig.module.rules[1], // = css

        // https://github.com/apollographql/apollo-link-state/issues/302
        // https://github.com/graphql/graphql-js/issues/1272#issuecomment-393903706
        { test: /\.mjs$/, include: /node_modules/, type: "javascript/auto" },

        // matomo lib use arrow function...
        {
          ...webpackConfig.module.rules[0], // ≈ babel-loader
          exclude: undefined,
          include: /node_modules\/matomo/,
        },
      ],
    },
  };
};
