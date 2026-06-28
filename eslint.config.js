import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    "rules": {
      "arrow-body-style": ["error", "always"],
      "semi": ["error", "always"],
      "no-mixed-spaces-and-tabs": "error",
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "prefer-template": "error",
      "no-shadow": "error",
      "no-var": "error",
      "prefer-destructuring": "error",
      "spaced-comment": "error",
      "arrow-spacing": "error",
      "block-spacing": "error",
      "brace-style": ["error", "1tbs"],
      "comma-dangle": ["error", "never"],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "object-curly-spacing": ["error", "always"],
      "no-duplicate-imports": "error",
      "keyword-spacing": ["error", { "before": true }],
      "quotes": [2, "single", { "avoidEscape": true }],
      "eqeqeq": ["error", "always"],
      "quote-props": ["error", "as-needed"],
      "key-spacing": ["error", { "afterColon": true }],
      "space-before-blocks": "error",
      "space-infix-ops": "error",
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "padding-line-between-statements": ["error", { "blankLine": "always", "prev": "block", "next": "block" }],
      "camelcase": [
        "error",
        {
          "properties": "never",
          "ignoreDestructuring": true,
          "ignoreImports": true
        }
      ],
      "curly": "error",
      "prefer-const": "error",
      "no-else-return": "error"
    }
  },
])
