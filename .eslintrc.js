module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:playwright/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsConfigRootDir: __dirname,
    project: ['./tsconfig.json', './playwright.config.js'],
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-tabs': ['warn', { allowIndentationTabs: false }],
    indent: ['error', 2, { offsetTernaryExpressions: true, SwitchCase: 1 }],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'playwright/no-networkidle': 'off',
    'playwright/expect-expect': 'off',
    'linebreak-style': 0,
    'no-empty': 'warn',
    'no-cond-assign': ['error', 'always'],
    'for-direction': 'off',
    'no-console': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1,
        maxEOF: 0,
      },
    ],
    'no-trailing-spaces': ['warn', { skipBlankLines: true }],
    'max-len': [
      'warn',
      {
        code: 130,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreStrings: true,
      },
    ],
  },
  ignorePatterns: ['**/*.json', '**/*.js'],
};
