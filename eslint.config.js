import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
// ✨ ADD THIS IMPORT
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // The reactHooks config is now part of the `plugins` object below
      // The reactRefresh config is now part of the `plugins` object below
    ],
    plugins: {
      // It's better to define plugins explicitly
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Rules from react-hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Rules from react-refresh
      'react-refresh/only-export-components': 'warn',

      // Your custom rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      'no-unused-vars': 'off', // Turn off base rule
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  prettierConfig, // ✨ ADD PRETTIER CONFIG LAST TO DISABLE CONFLICTING RULES
]);
