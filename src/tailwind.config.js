/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agro-primary': '#00B4F9',      // Azul celeste
        'agro-secondary': '#56AB1B',    // Verde
        'agro-tertiary': '#EA7A00',     // Naranja
      },
    },
  },
  plugins: [],
}
