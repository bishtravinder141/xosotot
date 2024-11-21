const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/next"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
  ],
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
    "import/extensions": [".ts", ".js", ".tsx", ".jsx"],
  },
  ignorePatterns: ["dist/", ".next/", "**/*.css", "node_modules/"],
  rules: {
    "import/order": "off",
    "import/no-default-export": "off",
    "react/jsx-no-leaked-render": "off",
    "turbo/no-undeclared-env-vars": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
  },
};
