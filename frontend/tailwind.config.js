/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'priority-high': '#ff4d4d',
        'priority-medium': '#ffcc00',
        'priority-low': '#4caf50',
      },
    },
  },
  plugins: [],
  important: true, // This ensures Tailwind classes take precedence
}