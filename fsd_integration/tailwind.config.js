/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        safe: "#16a34a",
        caution: "#d97706",
        risk: "#dc2626",
      },
    },
  },
  plugins: [],
};
