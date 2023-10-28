module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    requireConfigFile: false,
    es6: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'react/prop-types': 'off',
  },
  plugins: ['unused-imports'],
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:import/errors',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      jsconfig: {
        config: 'jsconfig.json',
      },
    },
  },
  rules: {
    'react-hooks/rules-of-hooks': 'off',
    'react/display-name': 'off',
    'no-unused-vars': 'off',
    'import/no-anonymous-default-export': 'off',
    'no-undef': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
}
