/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["futura", "system-ui", "-apple-system", "sans-serif"],
        bold: ["futurabold", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
