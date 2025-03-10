/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // @todo
    // "plugin:@typescript-eslint/recommended-type-checked",
    "next/core-web-vitals",
    "next/typescript",
    "eslint-config-prettier",
  ],
  overrides: [
    {
      files: ["*.js", "*.cjs", "*.mjs"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
    },
  ],
  parser: "@typescript-eslint/parser",
  root: true,
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "@typescript-eslint",
    "eslint-plugin-import",
    "eslint-plugin-unused-imports",
  ],
  rules: {
    // not relevant with some switch/case usage
    "no-fallthrough": "off",

    // that's for escape hatch, why would we want to ban it?
    "@typescript-eslint/ban-ts-comment": "off",

    // handy sometimes
    "@typescript-eslint/no-explicit-any": "off",

    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],

    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks:
          "(useDerivedValue|useAnimatedStyle|useAnimatedProps|useAnimatedReaction)",
      },
    ],
  },
};
