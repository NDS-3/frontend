/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        background01: "url('/public/img/background02.png')",
      },
    },
  },
  plugins: [],
};
