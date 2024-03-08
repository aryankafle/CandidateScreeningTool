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
      keyframes: {
      'spin-slow': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
    animation: {
      'spin-slow': 'spin-slow 3s linear infinite', // Adjust the duration as needed
    },
  },
},
variants: {},
plugins: [],
}

