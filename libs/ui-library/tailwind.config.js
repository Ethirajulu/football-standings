const { join } = require('path');
const baseConfig = require('../../tailwind.config');

module.exports = {
  ...baseConfig,
  content: [
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
    ...baseConfig.content,
  ],
};
