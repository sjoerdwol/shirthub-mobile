/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./newComponents/**/*.{js,jsx,ts,tsx}", "./views/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#151D28',
          border: 'rgb(44, 58, 78)',
          highlight: 'rgb(15, 115, 255)',
          placeholder: '#6F839F',
          secondaryBackground: 'rgb(34, 46, 63)',
          secondaryElements: 'rgb(141, 157, 180)'
        }
      },
      fontFamily: {
        Lexend: ['Lexend-Regular'],
        LexendMedium: ['LexendMedium'],
        LexendSemiBold: ['LexendSemiBold'],
        LexendBold: ['Lexend-Bold'],
        LexendExtraBold: ['LexendExtraBold'],
        LexendBlack: ['LexendBlack'],
        LexendExtraLight: ['LexendExtraLight'],
        LexendLight: ['LexendLight'],
        LexendThin: ['LexendThin'],
      },
      scale: {
        98: .98
      }
    },
  },
  plugins: [],
}

