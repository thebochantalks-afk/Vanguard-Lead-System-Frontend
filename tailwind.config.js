/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand (preserved)
        background: "#0D0D0D",
        surface: "#1A1A1A",
        border: "#2A2A2A",
        primary: "#FAFAF8",
        muted: "#6B6B6B",
        accent: "#FF4D1C",
        hot: "#FF4D1C",
        warm: "#F5A623",
        cold: "#6B6B6B",
        success: "#22C55E",

        // Premium extended palette
        'brand-deep': '#0A0A1A',
        'brand-dark': '#10102A',
        'brand-mid': '#1A1A3E',
        'brand-light': '#252550',

        // Indigo accent (secondary)
        'indigo-deep': '#1E1B4B',
        'indigo-dark': '#312E81',
        'indigo': '#4F46E5',
        'indigo-light': '#6366F1',
        'indigo-lighter': '#818CF8',
        'indigo-pale': '#A5B4FC',

        // Semantic
        'success-bg': '#064E3B',
        'warning': '#F59E0B',
        'warning-bg': '#451A03',
        'error': '#EF4444',
        'error-bg': '#450A0A',
        'info': '#3B82F6',
        'info-bg': '#1E3A5F',

        // Lead Tags
        'tag-hot': '#EF4444',
        'tag-hot-bg': '#450A0A',
        'tag-warm': '#F59E0B',
        'tag-warm-bg': '#451A03',
        'tag-cold': '#6B7280',
        'tag-cold-bg': '#1F2937',

        // Glass effects (rgba strings)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }], // 10px
        'xs': ['0.75rem', { lineHeight: '1rem' }],       // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],       // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],   // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],     // 36px
        '5xl': ['3rem', { lineHeight: '1' }],             // 48px
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.4)',
        'glow-accent': '0 0 20px rgba(255, 77, 28, 0.15)',
        'glow-indigo': '0 0 20px rgba(79, 70, 229, 0.15)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-premium': 'linear-gradient(135deg, #FF4D1C 0%, #F5A623 100%)',
        'gradient-indigo': 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FF4D1C 0%, #EF4444 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
};