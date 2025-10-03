import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#000',
        'primary-grey': '#4A5568',
        'soft-grey': '#F7F8FA',
        'gold-start': '#000',
        'gold-end': '#c89116',
        'charcoal-grey': '#2C2C2C',
        'medium-grey': '#4A4A4A',
        'light-grey': '#6B6B6B',
        'ocean-deep': '#2C2C2C', // Map to charcoal for backwards compatibility
        'ocean-mid': '#4A4A4A', // Map to medium grey for backwards compatibility
        'ocean-light': '#6B6B6B', // Map to light grey for backwards compatibility
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(90deg, #000 0%, #c89116 100%)',
        'grey-gradient': 'linear-gradient(180deg, #2C2C2C 0%, #4A4A4A 50%, #6B6B6B 100%)',
        'ocean-gradient': 'linear-gradient(180deg, #2C2C2C 0%, #4A4A4A 50%, #6B6B6B 100%)', // Updated for backwards compatibility
        'depth-gradient': 'linear-gradient(180deg, rgba(44,44,44,0.05) 0%, rgba(44,44,44,0.02) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(200,145,22,0.3) 50%, transparent 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config