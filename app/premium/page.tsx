import Link from 'next/link'

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="top-header transparent">
        <div className="nav-container">
          <nav className="nav-bar">
            <Link href="/" className="logo-minimal">Up40.</Link>
            <div className="nav-actions" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="nav-links">
                <Link href="/program" className="nav-link">Méthode</Link>
                <Link href="/premium" className="nav-btn active">Premium</Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero-section photo-hero" style={{ minHeight: 'auto', paddingBottom: '2rem' }}>
        <div className="hero-content">
          <div className="badge-new">Option Premium</div>
          <h1 className="display-title" style={{ fontSize: 'var(--text-xl)', maxWidth: '22ch' }}>
            Pour aller plus loin, sans en faire trop
          </h1>
          <p className="hero-description" style={{ maxWidth: '46ch', fontSize: '1rem' }}>
            L’option Premium s’adresse à celles et ceux qui veulent un suivi plus fin : plus de clarté sur les cycles, des ajustements personnalisés, et un accompagnement pour traverser les périodes où la régularité est plus difficile à tenir.
          </p>
        </div>
      </section>

      <section className="value-section">
        <div className="value-grid">
          <div className="value-box">
            <h3>Suivi plus détaillé</h3>
            <p>Accès à des repères plus précis sur ta progression : cycles, fréquences, ajustements de niveau. Le but n’est pas de te mettre sous pression, mais de te donner une visibilité claire sur ce que tu construis.</p>
          </div>
          <div className="value-box">
            <h3>Ajustements personnalisés</h3>
            <p>Possibilité d’ajuster le plan en fonction de contraintes spécifiques (semaine très chargée, reprise après pause, douleur ponctuelle) sans tout recommencer.</p>
          </div>
          <div className="value-box">
            <h3>Rendez-vous réguliers</h3>
            <p>Des points de passage programmés pour faire le point : ce qui progresse, ce qui bloque, ce qui doit être simplifié. L’idée est d’éviter de « lâcher » sans s’en rendre compte.</p>
          </div>
        </div>
      </section>

      <section className="value-section" style={{ paddingTop: 0 }}>
        <div className="value-grid">
          <div className="value-box" style={{ gridColumn: 'span 3' }}>
            <h3>Ce que le Premium n’est pas</h3>
            <p>Ce n’est pas une injonction à en faire plus, ni une promesse spectaculaire. C’est un cadre un peu plus structuré pour celles et ceux qui savent qu’ils ont besoin d’être accompagnés, sans être infantilisés.</p>
          </div>
        </div>
      </section>

      <section className="value-section" style={{ paddingTop: 0 }}>
        <div className="value-grid">
          <div className="value-box" style={{ gridColumn: 'span 3' }}>
            <h3>Décider si c’est pour toi</h3>
            <p>La version standard de Up40 suffit largement pour reprendre et progresser. L’option Premium est utile si tu sais que tu apprécies les rendez-vous, les retours réguliers, et un peu plus de structure dans ton suivi.</p>
          </div>
        </div>
      </section>

      <div className="footer-spacing"></div>

      <nav className="bottom-nav">
        <Link href="/" className="nav-item">Accueil</Link>
        <Link href="/onboarding" className="nav-item">Bilan</Link>
        <Link href="/program" className="nav-item">Méthode</Link>
        <Link href="/progress" className="nav-item">Progrès</Link>
        <Link href="/premium" className="nav-item active">Premium</Link>
      </nav>
    </main>
  )
}
