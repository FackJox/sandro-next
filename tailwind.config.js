module.exports = {
    mode: 'jit',
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
    ], // remove unused styles in production
    darkMode: 'media', // or 'media' or 'class'
    theme: {
      extend: {
        fontFamily: {
          BrandonReg: ['Brandon-reg', 'Arial', 'sans-serif'],
          BrandonBlack: ['Brandon-black', 'Arial', 'sans-serif'],
          BrandonMed: ['Brandon-medium', 'Arial', 'sans-serif'],
          Nexa: ['Nexa-Bold', 'Arial', 'sans-serif'],
          Interface: ['Interface', 'Arial', 'sans-serif'],
          Poppins: ['Poppins', 'Arial', 'sans-serif'],
        },
      },
      textColor: {
        transparent: 'transparent',
        current: 'currentColor',
        gold: '#f3982a',
        icewhite: '#d9e9ef',
        syellow: '#FCC300',
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
  