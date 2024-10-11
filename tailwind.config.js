/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        sm: "1rem",
        md: "6rem",
        lg: "8rem",
      },
    },
  },
  plugins: [],
};
