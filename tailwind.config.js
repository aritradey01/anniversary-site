/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        romantic: ['"Great Vibes"', 'cursive'],
        handwriting: ['"Caveat"', 'cursive'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}