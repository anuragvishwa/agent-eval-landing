/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lm: {
          ink: '#0d0e14', ink2: '#6a6f7d', ink3: '#a3a7b3',
          line: '#e8e8ee', line2: '#d9dae2', canvas: '#f4f4f7', wash: '#f0f0f4', paper: '#ffffff',
          accent: '#5b4bf5', accent2: '#8578ff', soft: '#f0eeff', accentline: '#dcd7ff',
          allow: '#16a34a', allowbg: '#dcfce7', bad: '#b91c1c', badbg: '#fee2e2',
          replan: '#1d4ed8', replanbg: '#dbeafe', wait: '#b45309', waitbg: '#fef3c7', pop: '#d4f56a',
        },
        background: 'hsl(var(--background) / <alpha-value>)',
        canvas: 'hsl(var(--canvas) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        'border-hover': 'hsl(var(--border-hover) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        secondary: 'hsl(var(--secondary) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['"SF Pro Display"', '-apple-system', 'system-ui', 'Inter', '"Helvetica Neue"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s steps(2, start) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
