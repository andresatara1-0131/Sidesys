// ESLint flat config (TypeScript + Playwright)
import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default [
  { ignores: ['node_modules', 'build', 'artifacts', 'allure-*', 'playwright-report', 'test-report', 'test-results', 'evidencias'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: { parserOptions: { ecmaVersion: 'latest', sourceType: 'module' } },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off'
    }
  }
];