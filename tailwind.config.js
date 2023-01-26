/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif'
      },
      colors: {
        checkmate: {
          purple: {
            default: '#8284FA',
            dark: '#5E60CE'
          },
          blue: {
            default: '#4EA8DE',
            dark: '#1E6F9F'
          },
          gray: {
            100: '#F2F2F2',
            200: '#D9D9D9',
            300: '#808080',
            400: '#333333',
            500: '#262626',
            600: '#1A1A1A',
            700: '#0D0D0D'
          },
          danger: '#E25858'
        }
      },
      height: {
        50: '12.5rem'
      },
      spacing: {
        0.5: '0.125rem'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
