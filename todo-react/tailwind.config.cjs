module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581b98'
        }
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '60%': { transform: 'scale(1.03)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        bounceIn: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '60%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        pop: 'pop 240ms ease-out',
        bounceIn: 'bounceIn 420ms cubic-bezier(.2,.8,.2,1)'
      }
    }
  },
  plugins: []
}
