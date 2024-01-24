/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        "font-sans": ["var(--font-inter)"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
