import type { Metadata, Viewport } from 'next'
import { Inter, Catamaran } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const catamaran = Catamaran({
  subsets: ['tamil'],
  variable: '--font-noto-tamil',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Indian Documentation Services Pte. Ltd.',
  description:
    'Your Indian legal documentation partner in Singapore. Serving NRIs, PIOs, and the Indian community for India-related legal, notarial, and documentation needs under Indian law.',
  keywords: [
    'Indian documentation Singapore',
    'NRI legal services Singapore',
    'Power of Attorney Singapore',
    'Apostille Singapore',
    'Indian law Singapore',
  ],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${catamaran.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
