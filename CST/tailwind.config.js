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
    extend: {
      animation: {
        text: 'text 5s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      }
    },
  },
  plugins: [],
}

