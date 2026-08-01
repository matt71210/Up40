import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Up40', description: 'Des pompes propres, après 40 ans.' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body><div className="container shell"><header className="topbar"><Link href="/" className="brand"><div className="logo">U</div><div><div>Up40</div><div className="muted">Des pompes propres, après 40 ans.</div></div></Link><div className="muted">Next.js MVP</div></header>{children}<div className="footerSpace" /></div><nav className="bottomnav"><Link href="/" className="navlink">Accueil</Link><Link href="/onboarding" className="navlink">Onboarding</Link><Link href="/program" className="navlink">Programme</Link><Link href="/progress" className="navlink">Progrès</Link><Link href="/premium" className="navlink">Premium</Link></nav></body></html>
}
