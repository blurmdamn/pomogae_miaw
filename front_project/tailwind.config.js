/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          burgundy: '#4b000f',
          dark: '#0a0a0a',
          steam: '#66c0f4',
          gog: '#a991d4',
          nintendo: '#e60012',
        },
      },
    },
    plugins: [],
  };
  