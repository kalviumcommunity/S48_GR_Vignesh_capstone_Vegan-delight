/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Include the root HTML file
    "./src/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./adminpages/**/*.{js,jsx}",
    "./admincomponents/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
