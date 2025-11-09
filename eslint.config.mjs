import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import stylistic from "@stylistic/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "@stylistic": stylistic,
      "unused-imports": unusedImports,
    },
    rules: {
      // see https://www.npmjs.com/package/eslint-plugin-unused-imports
      // "@typescript-eslint/no-unused-vars": ["error", {
      //   argsIgnorePattern: "^_",
      //   varsIgnorePattern: "^_",
      //   caughtErrorsIgnorePattern: "^_"
      // }],
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "args": "after-used",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@stylistic/quotes": ["warn", "double", { "allowTemplateLiterals": "always" }],
      "@stylistic/indent": ["warn", 2],
      "@stylistic/comma-dangle": ["warn", "always-multiline"],
      "@stylistic/semi": ["warn", "never"],
      "@stylistic/no-multiple-empty-lines": ["warn", { max: 1 }],
      "@stylistic/no-multi-spaces": "warn",
      "@stylistic/no-trailing-spaces": "warn",
      "@stylistic/space-before-blocks": ["warn", "always"],
      "@stylistic/space-infix-ops": "warn",
      "@stylistic/jsx-curly-newline": ["warn", "consistent"],
      "@stylistic/jsx-closing-bracket-location": ["warn", "line-aligned"],
      "@stylistic/eol-last": ["warn", "always"],
      "@stylistic/multiline-ternary": ["warn", "always-multiline"],
    }
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "eslint.config.mjs",
  ]),
]);

export default eslintConfig;
