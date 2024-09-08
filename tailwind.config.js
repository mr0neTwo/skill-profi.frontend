/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#242424FF',
          light: '#F9F9F9',
          DEFAULT: '#F9F9F9'
        },
        surface: {
          dark: '#242424',
          light: '#ffffff',
          DEFAULT: '#ffffff'
        },
        surface15: {
          dark: '#3e3e3e',
          light: '#bdbdbd',
          DEFAULT: '#bdbdbd'
        },
        main: {
          dark: '#FFFFFF',
          light: '#1E1E1E',
          DEFAULT: '#1E1E1E'
        },
        secondary: {
          dark: '#888888B3',
          light: '#a1a1a1',
          DEFAULT: '#a1a1a1'
        },
        green: {
          dark: '#45814E',
          light: '#52B852',
          DEFAULT: '#52B852'
        },
        green15: {
          dark: '#45814E26',
          light: '#52B85226',
          DEFAULT: '#52B85226'
        },
        green30: {
          dark: '#45814E52',
          light: '#52B85252',
          DEFAULT: '#52B85252'
        },
        green110: {
          dark: '#4e9158',
          light: '#5ac85a',
          DEFAULT: '#5ac85a'
        },
        red: {
          dark: '#C73B43',
          light: '#D91B26',
          DEFAULT: '#D91B26'
        },
        red15: {
          dark: '#C73B4326',
          light: '#D91B2626',
          DEFAULT: '#D91B2626'
        },
        red30: {
          dark: '#C73B4352',
          light: '#D91B2652',
          DEFAULT: '#D91B2652'
        },
        yellow: {
          dark: '#CBA712',
          light: '#EFCA2F',
          DEFAULT: '#EFCA2F'
        },
        blue: {
          dark: '#4f69cd',
          light: '#19659FFF',
          DEFAULT: '#19659FFF'
        },
        blue15: {
          dark: '#466FFF16',
          light: '#19659F26',
          DEFAULT: '#19659F26'
        },
        blue30: {
          dark: '#466FFF52',
          light: '#19659F52',
          DEFAULT: '#19659F52'
        },
        blue110: {
          dark: '#5077fd',
          light: '#5499fb',
          DEFAULT: '#5499fb'
        },
      }
    },
    fontFamily: {
      'qoute': ['El Messiri', 'sans-serif']
    }
  },
  corePlugins: {
    scrollbarWidth: false,
  },
  safelist: [
    'scrollbar-hide',
  ],
  variants: {},
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
}

