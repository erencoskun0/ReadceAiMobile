/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#000957',
        secondary: '#98D8EF',
      },
      fontFamily: {
        sans: ['Poppins-Regular'],
        medium: ['Poppins-Medium'],
        semibold: ['Poppins-SemiBold'],
        bold: ['Poppins-Bold'],
      },
    },
  },
  plugins: [],
};
