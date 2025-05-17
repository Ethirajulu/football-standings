const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const baseConfig = require('../../tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    join(__dirname, '../../libs/ui-library/src/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
    ...baseConfig.content,
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
