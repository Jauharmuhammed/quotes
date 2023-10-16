import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quotes.',
  description: 'Random Quote Generator.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: './favicon.ico',
        href: './favicon.ico',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: 'images/favicon-dark.ico',
        href: 'images/favicon-dark.ico',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, '')}>{children}</body>
    </html>
  )
}
