import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['**/dist/**', '**/node_modules/**', 'coverage/**', 'storybook-static/**']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['**/*.tsx'],
    extends: [reactHooks.configs.flat.recommended],
  },
  {
    basePath: 'apps/playground',
    files: ['src/**/*.{ts,tsx}'],
    extends: [reactRefresh.configs.vite],
  },
  {
    files: [
      'packages/react/src/**/*.{ts,tsx}',
      'apps/*/src/**/*.{ts,tsx}',
      'packages/create-app/template/src/**/*.{ts,tsx}',
    ],
    ignores: ['packages/react/src/Icons/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@phosphor-icons/react', '@phosphor-icons/react/*'],
              message:
                'Use o catálogo Icons do DS. A integração com Phosphor fica em packages/react/src/Icons.',
            },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
])
