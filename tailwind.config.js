/** @type {import('tailwindcss').Config} */

const lexendFontFamily = {
  Lexend: ['Lexend-Regular'],
  LexendMedium: ['Lexend-Medium'],
  LexendSemiBold: ['Lexend-SemiBold'],
  LexendBold: ['Lexend-Bold'],
  LexendExtraBold: ['Lexend-ExtraBold'],
  LexendBlack: ['Lexend-Black'],
  LexendExtraLight: ['Lexend-ExtraLight'],
  LexendLight: ['Lexend-Light'],
  LexendThin: ['Lexend-Thin'],
};

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./newComponents/**/*.{js,jsx,ts,tsx}", "./views/**/*.{js,jsx,ts,tsx}"],
  // Tailwind only generates utility classes it finds in `content`. Safelist every
  // Lexend weight so unused variants (Thin, Light, ExtraLight, ...) stay available.
  safelist: Object.keys(lexendFontFamily).map((name) => `font-${name}`),
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
      fontFamily: lexendFontFamily,
      scale: {
        98: .98
      }
    },
  },
  plugins: [],
}

