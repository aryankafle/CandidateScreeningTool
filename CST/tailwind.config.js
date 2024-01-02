/** @type {import('tailwindcss').Config} */
const colors = require('./colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
      ...{
        transparent: 'transparent',
        current: 'currentColor',
      },
      ...colors
    },
    extend: {},
  },
  plugins: [],
}

