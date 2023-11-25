module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        main: '#FF6600',
        white: '#F4F5FA',
        black: '#020308',
        black5: 'rgba(2, 3, 8, 0.05)',
        black20: 'rgba(2, 3, 8, 0.20)',
        black40: 'rgba(2, 3, 8, 0.40)',
        white40: 'rgba(244, 245, 250, 0.40)',
        green: '#15B01A',
        link: '#0033CC',
        error: '#F62935',
        red: '#D30F3F',
        yellow: '#FFD700',
        green: '#15B01A',
        grey: '#E8ECF3',
        steel: '#485268',
        greyLite: '#F6F8FC',
      },
      boxShadow: {
        form: '0px 10px 20px 0px rgba(2, 3, 8, 0.20)',
        header: '0px 1px 10px 0px #CCD1DF40',
        card: '0px 3px 6px 0px rgba(168, 167, 180, 0.10), 0px 11px 11px 0px rgba(168, 167, 180, 0.09), 0px 24px 14px 0px rgba(168, 167, 180, 0.05), 0px 42px 17px 0px rgba(168, 167, 180, 0.01), 0px 66px 19px 0px rgba(168, 167, 180, 0.00)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
