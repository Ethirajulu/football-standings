const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'apps/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'libs/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
