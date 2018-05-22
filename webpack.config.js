import path from "path";

import defaultWebpackConfig from "@phenomic/plugin-bundler-webpack/lib/webpack.config.js";

module.exports = (config: PhenomicConfig) => {
  const webpackConfig = defaultWebpackConfig(config);
  return Object.assign({}, webpackConfig, {
    module: {
      rules: [
        // react-native-web
        {
          test: /\.js$/,
          include: [
            path.resolve("lib"),
            path.resolve("src"),
            path.resolve("node_modules", "bs-react-native")
          ],
          loader: require.resolve("babel-loader"),
          options: {
            babelrc: false,
            plugins: [require.resolve("babel-plugin-react-native-web")]
          }
        }
      ].concat(webpackConfig.module.rules)
    }
  });
};
