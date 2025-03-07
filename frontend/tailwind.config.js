/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables dark mode support

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#FFCE1A',
        'secondary':'#0D0842',
        'blackBG':'#F3F3F3',
        'Favorite':'#FF5841',
        darkBG: "#121212", // Dark background
        lightBG: "#ffffff", // Light background
        lightText: "#ffffff", // Text color for dark mode
        darkText: "#000000", // Tex// Dark text in light mode
      },
      fontFamily:{
        'primary':["Montserrat", "sans-serif"],
        'secondary':["Nunito Sans","sans-serif"]
      }
    },
  },
  
  plugins: [],
};

