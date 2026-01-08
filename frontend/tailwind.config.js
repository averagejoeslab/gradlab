/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom dark theme colors
        void: {
          950: '#08090a',
          900: '#0d0f12',
          800: '#13161b',
          700: '#1a1e25',
          600: '#252b35',
          500: '#323a47',
        },
        // Value/forward flow colors (cool blue)
        flow: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        // Gradient/backward flow colors (warm orange)
        grad: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        // Accent colors
        accent: {
          cyan: '#22d3ee',
          emerald: '#34d399',
          rose: '#fb7185',
          violet: '#a78bfa',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flow': 'flow 2s ease-in-out infinite',
        'gradient-flow': 'gradientFlow 1.5s ease-out',
      },
      keyframes: {
        flow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        gradientFlow: {
          '0%': { strokeDashoffset: 100 },
          '100%': { strokeDashoffset: 0 },
        },
      },
    },
  },
  plugins: [],
}

