/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors:{

        'darculaBG': {
          light: '#354652',
          medium: '#293740',
          heavy: '#0f1417'
        },
        
        'lightBG': {
          light: '#d9f0ff',
          medium: '#b4c7d4',
          heavy: '#7e8b94',
        },


      },

      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      }

    },
  },
  plugins: [],
}
