/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          900: '#0a0a0f',
          800: '#13131e',
          700: '#1c1c2e',
          600: '#25253d',
          500: '#3a3a5c',
        },
        accent: {
          DEFAULT: '#7c3aed',
          hover: '#6d28d9',
          glow: '#8b5cf6',
          muted: '#4c1d95',
        },
        beat: {
          green: '#10b981',
          red: '#ef4444',
          amber: '#f59e0b',
          sky: '#38bdf8',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-violet': '0 0 20px rgba(124, 58, 237, 0.4)',
        'glow-green': '0 0 12px rgba(16, 185, 129, 0.3)',
      },
      animation: {
        'equalizer': 'equalizer 0.8s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s linear infinite',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        equalizer: {
          '0%': { height: '20%' },
          '100%': { height: '100%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
