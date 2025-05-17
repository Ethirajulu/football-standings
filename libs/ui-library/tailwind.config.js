const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const baseConfig = require('../../tailwind.config');

module.exports = {
  ...baseConfig,
  content: [
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
    ...baseConfig.content,
  ],
};
