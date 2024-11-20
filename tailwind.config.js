/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans], // 全局默认字体
        inria: ['var(--font-inria-serif)', ...fontFamily.serif], // 覆盖字体
        'inria-normal': ['var(--font-inria-serif-normal)', ...fontFamily.sans],
      },
      screens:{
        xs: '480px',
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
