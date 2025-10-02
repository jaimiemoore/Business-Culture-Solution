import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Culture Solutions - Transform Your Workplace Culture',
  description: 'Transform workplace culture through the science of human behavior, NLP, and strategic hypnosis. Unlock your team\'s potential today.',
  keywords: 'workplace culture, NLP, neurolinguistic programming, corporate training, employee engagement, behavioral change',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}