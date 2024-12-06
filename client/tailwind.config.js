/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "disabled-input": "rgba(239, 239, 239, 0.3)",
      },
    },
  },
  plugins: [],
};
