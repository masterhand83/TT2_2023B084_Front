/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "gray": "#eeeeee",
        "danger": "#ff0000",
        "warning": "#ffd400",
        "success": "#14e81b",
        "background": "#f7fdff"
      }
    },
  },
  plugins: [],
}
