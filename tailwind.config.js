export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agro-green': '#2d5016',
        'agro-light': '#65a30d',
        'agro-pale': '#dcfce7',
        'agro-earth': '#9a6b4c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
