/** @types {import('tailwindcss').Config}*/

module.exports = {
  content: [
    "./app/**/*.{tsx,ts,jsx,js}",
    "./pages/**/*.{tsx,ts,jsx,js}",
    "./components/**/*.{tsx,ts,jsx,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
