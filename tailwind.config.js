/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          accent: '#3b79c9',
          background: '#e0e5eb',
          primary: '#1e406b',
          secondary: '#94b5e1',
          text: '#14191f',
        },
        dark: {
          accent: '#3673c4',
          background: {
            200: '#3b4047',
            250: '#2c3035',
            300: '#23272e',
            400: '#14191f',
          },
          primary: '#94b5e1',
          secondary: '#1e406b',
          text: {
            400: '#e0e5eb',
            500: '#aeb3b8'
          }
        }
      }
    },
  },
  plugins: [],
}

