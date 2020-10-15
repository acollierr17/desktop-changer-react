module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/indent': ['error', 2, { 'SwitchCase': 1 }],
    '@typescript-eslint/explicit-function-return-type': ['warn', { 'allowExpressions': true, 'allowTypedFunctionExpressions': true }],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'quotes': ['warn', 'single'],
    'eol-last': ['error', 'always'],
    'curly': ['off'],
    '@typescript-eslint/no-inferrable-types': ['off'],
    '@typescript-eslint/no-unused-vars': ['off']
  },
};
