/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Pulled from the original template's SCSS variables so the
        // rebuilt UI keeps the same brand identity.
        primary: {
          DEFAULT: "#003A66",
          50: "#e6eef4",
          100: "#c0d5e3",
          200: "#96b9d0",
          300: "#6b9cbd",
          400: "#4b86ae",
          500: "#2b709f",
          600: "#256090",
          700: "#003A66",
          800: "#012c4e",
          900: "#001f38",
        },
        secondary: {
          DEFAULT: "#E02454",
          50: "#fde8ee",
          100: "#f9c1d1",
          200: "#f596b0",
          300: "#f16a90",
          400: "#ed4a78",
          500: "#E02454",
          600: "#c81f49",
          700: "#a8193c",
          800: "#88142f",
          900: "#6a1025",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["'Open Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
