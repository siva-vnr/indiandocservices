import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1B3A6B',
        gold: '#C9A84C',
        surface: '#F8F9FA',
        disclaimer: '#FEF3C7',
        'disclaimer-border': '#92400E',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        tamil: ['var(--font-noto-tamil)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
