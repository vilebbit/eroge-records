import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import stylistic from "@stylistic/eslint-plugin";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      "@stylistic/quotes": ["warn", "double", { "allowTemplateLiterals": "always" }],
      "@stylistic/indent": ["warn", 2],
      "@stylistic/comma-dangle": ["warn", "always-multiline"],
      "@stylistic/semi": ["warn", "never"],
      "@stylistic/no-multiple-empty-lines": ["warn", { max: 1 }],
      "@stylistic/no-multi-spaces": "warn",
      "@stylistic/no-trailing-spaces": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@stylistic/space-before-blocks": ["warn", "always"],
      "@stylistic/space-infix-ops": "warn",
      "@stylistic/jsx-curly-newline": ["warn", "consistent"],
      "@stylistic/jsx-closing-bracket-location": ["warn", "aligned"],
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
