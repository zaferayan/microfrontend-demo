// This file defines the shared Tailwind setup for the whole monorepo.
const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, 'apps/**/*.{ts,tsx,js,jsx,html}'),
    path.join(__dirname, 'packages/**/*.{ts,tsx,js,jsx,html}')
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9ecff',
          500: '#0f766e',
          600: '#0d5f59',
          700: '#0a4b46'
        },
        ink: {
          900: '#102033',
          700: '#344255',
          500: '#66758a'
        },
        sand: '#f7f1e8'
      },
      boxShadow: {
        panel: '0 20px 60px rgba(16, 32, 51, 0.12)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
};
