
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-font-inter'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/container-queries')
],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
