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
        'ocean-deep': '#0A2540',
        'ocean-mid': '#1E3A5F',
        'ocean-light': '#2D4A7C',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(90deg, #000 0%, #c89116 100%)',
        'ocean-gradient': 'linear-gradient(180deg, #0A2540 0%, #1E3A5F 50%, #2D4A7C 100%)',
        'depth-gradient': 'linear-gradient(180deg, rgba(10,37,64,0.05) 0%, rgba(10,37,64,0.02) 100%)',
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