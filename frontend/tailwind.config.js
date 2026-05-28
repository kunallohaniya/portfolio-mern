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
        // Core palette — Monochrome Terminal meets Editorial Print
        base: '#0A0A0A',           // Near-black background
        surface: '#111111',        // Slightly lifted surface
        'surface-2': '#1A1A1A',    // Track / subtle bg
        'border-dim': '#222222',   // Subtle border
        'border-std': '#333333',   // Full-bleed hr dividers
        offwhite: '#F0EDE6',       // Primary text — NOT pure white
        muted: '#888888',          // Secondary text
        amber: {
          DEFAULT: '#E8C547',      // The ONE accent — muted gold-amber
          dim: '#C9A83A',          // Hover/active amber
          faint: 'rgba(232,197,71,0.08)', // Subtle amber bg tint
        },
        alert: '#C0392B',          // Red — used ≤ 3 places only
        'alert-dim': '#A93226',
        success: '#22C55E',        // Available badge green
      },
      fontFamily: {
        // NO Inter, NO Roboto, NO system-ui
        display: ['Syne', 'sans-serif'],   // Geometric architectural headings
        mono: ['"DM Mono"', 'monospace'],  // Developer-authentic body
        sans: ['Syne', 'sans-serif'],      // Default to Syne
      },
      fontSize: {
        // Editorial type scale
        'hero': 'clamp(64px, 10vw, 120px)',
        'display': 'clamp(40px, 6vw, 80px)',
        'section': 'clamp(28px, 4vw, 48px)',
        'label': '0.75rem',
      },
      letterSpacing: {
        'label': '0.2em',   // ALL-CAPS DM Mono labels
        'wide': '0.08em',
      },
      lineHeight: {
        'tight-display': '0.9',
        'editorial': '1.15',
      },
      spacing: {
        'section': '160px',   // Min between major sections
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        // Availability pulse
        'pulse-green': 'pulseGreen 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Marquee footer
        'marquee': 'marquee 30s linear infinite',
        'marquee-pause': 'marquee 30s linear infinite paused',
        // Cursor blink
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        // Scanline (easter egg terminal)
        'scanline': 'scanline 8s linear infinite',
        // Reading progress (handled via JS inline style)
      },
      keyframes: {
        pulseGreen: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.4)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        // Noise texture (used as SVG data-uri in CSS)
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
}