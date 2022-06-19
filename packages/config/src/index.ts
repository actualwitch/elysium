import type { Config } from "prettier";

export const prettierConfig: Config = {
  trailingComma: "all",
  jsxBracketSameLine: true,
  quoteProps: "consistent",
  printWidth: 120,
  tabWidth: 2,
};

export const eslintConfig = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "google",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      pragma: "React",
      version: "detect",
      flowVersion: "0.53",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-key": "off",
    "react/display-name": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "indent": ["off"],
    "new-cap": ["error", { capIsNew: false }],
    "@typescript-eslint/ban-types": [
      "error",
      {
        extendDefaults: true,
        types: {
          "{}": false,
        },
      },
    ],
    "no-throw-literal": "off",
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
  ignorePatterns: ["react-app-env.d.ts", "dist/*", "types/*"],
  env: {
    browser: true,
    node: true,
  },
};
