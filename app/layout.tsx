import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Up40',
  description: 'Up40 - Programme de reprise et de progression',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
