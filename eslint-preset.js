module.exports = {
  extends: ['next', 'prettier', 'airbnb-base'],
  settings: {
    next: {
      rootDir: ['src/*/'],
    },
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: './tsconfig.json',
  },
  // ignorePatterns: ['packages/api/generated-types/**.ts'],
  rules: {
    'react/jsx-key': 'off',
    indent: 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    // Configuration for TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: [
        '@typescript-eslint',
        'unused-imports',
        'simple-import-sort',
        'prettier',
      ],
      extends: [
        'airbnb-typescript',
        'next/core-web-vitals',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      parserOptions: {
        parser: "@typescript-eslint/parser",
        project: './tsconfig.json',
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto',
          },
        ],
        indent: [
          2,
          2,
          {
            SwitchCase: 1,
          },
        ],
        'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
        'jsx-a11y/anchor-is-valid': 'off', // Next.js use his own internal link system
        'react/require-default-props': 'off', // Allow non-defined react props as undefined
        'react/jsx-props-no-spreading': 'off', // _app.tsx uses spread operator and also, react-hook-form
        'react-hooks/exhaustive-deps': 'off', // Incorrectly report needed dependency with Next.js router
        '@next/next/no-img-element': 'off',
        // We currently not using next/image because it isn't supported with SSG mode
        '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
        '@typescript-eslint/indent': 'off', // Avoid conflict rule between Eslint and Prettier
        '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
        'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
        'simple-import-sort/imports': 'warn', // Import configuration for `eslint-plugin-simple-import-sort`
        'simple-import-sort/exports': 'warn', // Export configuration for `eslint-plugin-simple-import-sort`
        '@next/next/no-html-link-for-pages': 'off', // It can't find pages dir in api and ui packages
        'class-methods-use-this': 'off', // it doesn't make sense when using React class components
        'unused-imports/no-unused-imports': 'error',
        'no-console': 'warn',
        'no-var': 'error',
        'prefer-template': 'error',
        'import/no-extraneous-dependencies': 'warn',
        'react/no-children-prop': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
          },
        ],
      },
    },
  ],
};
