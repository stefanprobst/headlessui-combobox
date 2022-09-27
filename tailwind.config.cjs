const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.@(css|ts|tsx)'],
  theme: {
    colors: {
      neutral: { 0: colors.white, ...colors.slate, 1000: colors.black },
    },
    extend: {
      fontFamily: {
        sans: ['InterVariable', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
}

module.exports = config
