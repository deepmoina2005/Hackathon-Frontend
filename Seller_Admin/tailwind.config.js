/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
				primary2: "#ff8901",
				secondary2: "#fb923c",
      }
    },
  },
  plugins: [],
}