import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Up40 | Des pompes propres, après 40 ans',
  description: 'Reconstruisez votre force. Préservez votre corps.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var t = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              document.documentElement.setAttribute('data-theme', t);
            } catch(e) {}
          })();
        ` }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
