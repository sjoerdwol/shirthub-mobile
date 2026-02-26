/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./newComponents/**/*.{js,jsx,ts,tsx}", "./views/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        vanillaCream: '#F0EAD2',
        cream: '#DDE5B6',
        mutedOlive: '#ADC178',
        oliveLeaf: '#606C38',
        blackForest: '#283618',
        fadedCopper: '#A98467',
        ashBrown: '#6C584C'
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

