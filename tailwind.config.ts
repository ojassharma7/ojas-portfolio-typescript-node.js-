import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        term: {
          bg: 'rgb(var(--t-bg) / <alpha-value>)',
          surface: 'rgb(var(--t-surface) / <alpha-value>)',
          raised: 'rgb(var(--t-raised) / <alpha-value>)',
          border: 'rgb(var(--t-border) / <alpha-value>)',
          text: 'rgb(var(--t-text) / <alpha-value>)',
          muted: 'rgb(var(--t-muted) / <alpha-value>)',
          green: 'rgb(var(--t-green) / <alpha-value>)',
          blue: 'rgb(var(--t-blue) / <alpha-value>)',
          purple: 'rgb(var(--t-purple) / <alpha-value>)',
          red: 'rgb(var(--t-red) / <alpha-value>)',
          yellow: 'rgb(var(--t-yellow) / <alpha-value>)',
          cyan: 'rgb(var(--t-cyan) / <alpha-value>)',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        'glow-pulse': 'glow-pulse 2.8s ease-in-out infinite',
        'beam-sweep': 'beam-sweep 4.5s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.65', transform: 'scale(1.18)' },
        },
        'beam-sweep': {
          '0%': { opacity: '0', transform: 'translate(-70px,-44px) scaleX(0.5)' },
          '20%': { opacity: '0.8' },
          '70%': { opacity: '0.8' },
          '100%': { opacity: '0', transform: 'translate(6px,4px) scaleX(1.1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
