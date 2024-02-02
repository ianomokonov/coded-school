module.exports = {
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'auto',
  useTabs: false,
  tabWidth: 4,
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',
  bracketSpacing: true,
  printWidth: 100,
  overrides: [
    {
      files: '*.json',
      options: {
        tabWidth: 2,
      },
    },
    {
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
  ],
};
