/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a1a',
        primary: {
          light: '#FF6B6B',
          DEFAULT: '#FF4757',
          dark: '#FF3344',
        },
        secondary: {
          light: '#54A0FF',
          DEFAULT: '#2E86DE',
          dark: '#0077C0',
        },
        background: {
          light: '#F0F0F0',
          dark: '#1A1A2E',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#16213E',
        },
        text: {
          light: '#333333',
          dark: '#E0E0E0',
        },
      },
    },
  },
  plugins: [],
}
