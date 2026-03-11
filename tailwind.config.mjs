/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        'Geist',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
      ],
    },
    extend: {
      colors: {
        navy: '#020617',
        emerald: '#10b981',
        indigo: '#6366f1',
        rose: '#f43f5e',
        amber: '#f59e42',
        sky: '#0ea5e9',
        card: 'rgba(255,255,255,0.05)',
        border: 'rgba(255,255,255,0.10)',
      },
      boxShadow: {
        glass: '0 4px 32px 0 rgba(16, 30, 54, 0.12)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
                modalZoomIn: {
                  '0%': { opacity: 0, transform: 'scale(0.92)' },
                  '100%': { opacity: 1, transform: 'scale(1)' },
                },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': {
            opacity: 0.7,
            textShadow:
              '0 0 8px #34d399, 0 0 16px #0ea5e9, 0 0 24px #f472b6, 0 0 32px #34d39988'
          },
          '50%': {
            opacity: 1,
            textShadow:
              '0 0 16px #0ea5e9, 0 0 32px #f472b6, 0 0 48px #34d399, 0 0 64px #f472b688'
          },
        },
        'fab-gradient': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        'fab-glow': {
          '0%, 100%': {
            boxShadow: '0 0 16px 4px #34d39988, 0 0 32px 8px #0ea5e988',
          },
          '50%': {
            boxShadow: '0 0 32px 8px #f472b6aa, 0 0 64px 16px #0ea5e988',
          },
        },
        'fab-pop': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
          modalZoomIn: 'modalZoomIn 0.25s cubic-bezier(.4,0,.2,1) both',
        fadeInUp: 'fadeInUp 0.3s cubic-bezier(.4,0,.2,1) both',
        glow: 'glow 2s ease-in-out infinite',
        'fab-gradient': 'fab-gradient 3s ease-in-out infinite',
        'fab-glow': 'fab-glow 2.5s ease-in-out infinite',
        'fab-pop': 'fab-pop 2.5s cubic-bezier(.4,0,.2,1) infinite',
      },
    },
  },
  plugins: [],
};
