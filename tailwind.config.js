 /** @type {import('tailwindcss').Config} */
 import daisyui from 'daisyui';
 {import('tailwindcss').Config}


 export default {
  darkMode: 'class',
  content: [
    './index.html', './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}