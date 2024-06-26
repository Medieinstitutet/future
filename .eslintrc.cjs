module.exports = {
    root: true,
    env: { browser: true,
      es2021: true,
      node: true, },
      globals: {
        process: 'readonly', // Add this line
        dirname: 'readonly',
        filename: 'readonly',
        global: 'readonly',
      },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "react/prop-types": "off"
    },
  }