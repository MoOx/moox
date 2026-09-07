// See `metro.config.cjs` for why the Expo-side configs are `.cjs` and not `.ts`.
module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Reanimated's plugin must stay last.
      "react-native-worklets/plugin",
    ],
  };
};
