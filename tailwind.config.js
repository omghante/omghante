/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#09090B',
        navy: {
          900: '#0F172A',
          950: '#172554',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
