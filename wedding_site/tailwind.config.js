/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'script': ['Dancing Script', 'cursive'],
        'palatino': ['"Palatino Linotype"', 'Palatino', 'Georgia', 'serif'],
        'candle-script': ['Candlescript', 'cursive'],
      },
    },
  },
  plugins: [],
}

