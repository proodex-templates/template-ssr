import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },

  {
    // ➡️ Use tseslint.configs.recommended here as the base extension
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],

    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    plugins: {
      'react-hooks': reactHooks,
    },

    rules: {
      // Keep safe React hook rules (prevent real runtime bugs)
      ...reactHooks.configs.recommended.rules,

      // ➡️ Overrides for type-checking rules you want to disable:
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  }
)