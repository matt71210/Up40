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
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" rel="stylesheet" />
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
