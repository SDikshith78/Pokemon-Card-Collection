/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#2660A4',
        customGreenLight: '#A3C9A8',
        customGreen: '#84B59F',
        customGreenDark: '#69A297',
        customYellow: '#FCE762',
        customGreenPale: '#A9F0D1',
      },
      fontFamily: {
        gilroyBlack: ['GilroyBlack', 'sans-serif'],
        gilroyBold: ['GilroyBold', 'sans-serif'],
        gilroyLight: ['GilroyLight', 'sans-serif'],
        gilroyMedium: ['GilroyMedium', 'sans-serif'],
        gilroyRegular: ['GilroyRegular', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

