// const { scrollbarGutter, scrollbarWidth, scrollbarColor } = require('tailwind-scrollbar-utilities');

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      opacity: [...new Array(100).keys()].reduce((acc, key) => (acc[key] = 0.01*key, acc), {})
    },
  },
  plugins: [
    require('tailwindcss-font-inter'),
    require('@tailwindcss/line-clamp'),
    // require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/container-queries'),
    // scrollbarGutter(), // no options to configure
    // scrollbarWidth(), // no options to configure
    // scrollbarColor(), // no options to configure
],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
