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
        // Custom Royal Purple + Gold Branding
        primary: {
          50: '#f3e5ff',
          100: '#e0c2ff',
          200: '#c899ff',
          300: '#af70ff',
          400: '#9747ff',
          500: '#4A00E0', // Royal Electric Purple (Primary)
          600: '#3d00b8',
          700: '#300090',
          800: '#230068',
          900: '#16003f',
          DEFAULT: '#4A00E0',
        },
        secondary: {
          50: '#f5ebfb',
          100: '#ebd7f7',
          200: '#d7b0ef',
          300: '#c388e7',
          400: '#af61df',
          500: '#8E2DE2', // Gradient Violet (Secondary)
          600: '#7224b5',
          700: '#561a88',
          800: '#3a115c',
          900: '#1e092f',
          DEFAULT: '#8E2DE2',
        },
        accent: {
          50: '#fffef5',
          100: '#fffce6',
          200: '#fff8cc',
          300: '#fff4b3',
          400: '#ffef99',
          500: '#FFD700', // Gold (Accent)
          600: '#ccac00',
          700: '#998100',
          800: '#665600',
          900: '#332b00',
          DEFAULT: '#FFD700',
        },
        // Dark theme colors - Slate scale for consistent contrast
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Custom theme colors
        'royal-purple': '#4A00E0',
        'violet-gradient': '#8E2DE2',
        'gold': '#FFD700',
        'light-bg': '#FFFFFF',
        'dark-bg': '#0A0A0A',
      },
      fontFamily: {
        'sans': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'display': ['Poppins', 'Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
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
        'gradient-primary': 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)',
        'gradient-premium': 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        'gradient-purple-gold': 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 50%, #FFD700 100%)',
        'mesh-gradient': 'linear-gradient(45deg, #4A00E0 0%, #8E2DE2 100%)',
        'cyber-grid': 'linear-gradient(rgba(74,0,224,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,0,224,0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'mesh': '400% 400%',
        'cyber': '20px 20px',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(74, 0, 224, 0.5)',
        'glow-lg': '0 0 40px rgba(74, 0, 224, 0.6)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(74, 0, 224, 0.3)',
        'purple-glow': '0 0 30px rgba(74, 0, 224, 0.4), 0 0 60px rgba(142, 45, 226, 0.3)',
        'gold-glow': '0 0 20px rgba(255, 215, 0, 0.6)',
        'cyber': '0 0 20px rgba(74, 0, 224, 0.5), inset 0 0 20px rgba(74, 0, 224, 0.1)',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
}