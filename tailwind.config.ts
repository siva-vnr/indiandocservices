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
        navy: '#1A3D2B',
        gold: '#C4863A',
        surface: '#FAF6F0',
        disclaimer: '#ECFDF5',
        'disclaimer-border': '#1A3D2B',
        muted: '#5C6B5E',
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
