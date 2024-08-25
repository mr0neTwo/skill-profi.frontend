/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#171821',
          light: '#171821',
          DEFAULT: '#171821'
        },
        darkgrey: {
          dark: '#21222D',
          light: '#21222D',
          DEFAULT: '#21222D'
        },
        lightgrey: {
          dark: '#87888C',
          light: '#87888C',
          DEFAULT: '#87888C'
        },
        green: {
          dark: '#A9DFD8',
          light: '#A9DFD8',
          DEFAULT: '#A9DFD8'
        },
        pink: {
          dark: '#F2C8ED',
          light: '#F2C8ED',
          DEFAULT: '#F2C8ED'
        },
        orange: {
          dark: '#FCB859',
          light: '#FCB859',
          DEFAULT: '#FCB859'
        },
        blue: {
          dark: '#28AEF3',
          light: '#28AEF3',
          DEFAULT: '#28AEF3'
        },
        hover: {
          dark: '#37394BFF',
          light: '#37394BFF',
          DEFAULT: '#37394BFF'
        }
      }
    },
  },
  plugins: [],
}

