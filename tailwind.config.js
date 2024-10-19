/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hidden": {
          "scrollbar-width": "none" /* Untuk Firefox */,
          "-ms-overflow-style": "none" /* Untuk IE dan Edge */,
        },
        ".scrollbar-hidden::-webkit-scrollbar": {
          display: "none" /* Untuk Chrome, Safari, dan Opera */,
        },
      });
    },
  ],
};
