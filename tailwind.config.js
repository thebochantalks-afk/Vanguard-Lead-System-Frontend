/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D",
        surface: "#1A1A1A",
        border: "#2A2A2A",
        primary: "#FAFAF8",
        muted: "#6B6B6B",
        accent: "#FF4D1C",
        hot: "#FF4D1C",
        warm: "#F5A623",
        cold: "#6B6B6B",
        success: "#22C55E",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
