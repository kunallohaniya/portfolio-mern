/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0ebfb',
          100: '#e1d7f7',
          200: '#c3b0ef',
          300: '#a588e7',
          400: '#8761df',
          500: '#6A3AD7', // Primary color
          600: '#552eac',
          700: '#402381',
          800: '#2a1756',
          900: '#150c2b',
        },
        secondary: {
          50: '#f5ebfb',
          100: '#ebd7f7',
          200: '#d7b0ef',
          300: '#c388e7',
          400: '#af61df',
          500: '#8E2DE2', // Secondary color
          600: '#7224b5',
          700: '#561a88',
          800: '#3a115c',
          900: '#1e092f',
        },
        accent: {
          50: '#fffdf0',
          100: '#fffbe6',
          200: '#fff7cc',
          300: '#fff3b3',
          400: '#ffef99',
          500: '#FFD700', // Accent color
          600: '#cca800',
          700: '#997e00',
          800: '#665400',
          900: '#332a00',
        },
        dark: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#d0d0d0',
          400: '#b0b0b0',
          500: '#909090',
          600: '#707070',
          700: '#505050',
          800: '#303030',
          900: '#101010',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'display': ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 15s ease infinite',
        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(106, 58, 215, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(106, 58, 215, 0.8), 0 0 30px rgba(106, 58, 215, 0.6)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'orange' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        'cyber-grid': 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
        'gradient-premium': 'linear-gradient(135deg, #6A3AD7 0%, #8E2DE2 100%)',
      },
      backgroundSize: {
        'mesh': '400% 400%',
        'cyber': '20px 20px',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(106, 58, 215, 0.5)',
        'glow-lg': '0 0 40px rgba(106, 58, 215, 0.6)',
        'inner-glow': 'inset 0 0 20px rgba(106, 58, 215, 0.3)',
        'cyber': '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1)',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
}