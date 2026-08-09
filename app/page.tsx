import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <header className="top-header transparent">
        <div className="nav-container">
          <nav className="nav-bar">
            <Link href="/" className="logo-minimal">Up40.</Link>
            <div className="nav-actions" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="nav-links">
              <Link href="/program" className="nav-link">La méthode</Link>
              <Link href="/premium" className="nav-btn">Premium</Link>
            </div>
            <ThemeToggle />
          </div>
          </nav>
        </div>
      </header>

      <section className="hero-section photo-hero">
        <div className="hero-content">
          <div className="badge-new">Nouveau standard de reprise</div>
          <h1 className="display-title">
            Reconstruisez votre force.<br />
            <span className="text-gray">Préservez votre corps.</span>
          </h1>
          <p className="hero-description">
            Up40 est le programme d'entraînement conçu pour la biomécanique de l'adulte actif. Fini le fitness brutal et l'usure prématurée : retrouvez de vraies pompes complètes avec 12 minutes de pratique intelligente par jour.
          </p>
          <div className="cta-group">
            <Link href="/onboarding" className="btn-dark">Démarrer mon bilan</Link>
            <Link href="/program" className="btn-outline">Découvrir la méthode</Link>
          </div>
          <div className="trust-metrics">
            <div className="metric">
              <span className="metric-val">12 min</span>
              <span className="metric-lbl">Par séance</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric">
              <span className="metric-val">3x</span>
              <span className="metric-lbl">Par semaine</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Poids du corps</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="iphone-mockup">
            <div className="iphone-notch"></div>
            <div className="app-ui">
              <header className="app-header">
                <div>
                  <div className="app-date">Aujourd'hui</div>
                  <div className="app-greeting">Bonjour Mathieu</div>
                </div>
                <div className="app-avatar">M</div>
              </header>

              <div className="app-tracker">
                <div className="track-day">L</div>
                <div className="track-day active">M</div>
                <div className="track-day">M</div>
                <div className="track-day">J</div>
                <div className="track-day">V</div>
                <div className="track-day">S</div>
                <div className="track-day">D</div>
              </div>

              <div className="app-section-title">Séance du jour</div>

              <div className="task-card completed">
                <div className="task-icon">✓</div>
                <div className="task-details">
                  <h4>Préparation articulaire</h4>
                  <p>3 min • Poignets & Épaules</p>
                </div>
              </div>

              <div className="task-card active">
                <div className="task-icon play">▶</div>
                <div className="task-details">
                  <h4>Pompes inclinées N2</h4>
                  <p>4 séries de 8 • Tempo 3-1-1</p>
                </div>
              </div>

              <div className="task-card locked">
                <div className="task-icon">🔒</div>
                <div className="task-details">
                  <h4>Gainage actif</h4>
                  <p>2 min • Renforcement profond</p>
                </div>
              </div>

            </div>
          </div>
          <div className="visual-glow"></div>
        </div>
      </section>

      <section className="value-section">
        <div className="value-grid">
          <div className="value-box">
            <h3>Confort des épaules</h3>
            <p>Une progression axée sur le placement et le respect articulaire, pas sur le volume pur.</p>
          </div>
          <div className="value-box">
            <h3>Des paliers réalistes</h3>
            <p>On ne commence pas au sol. L'algorithme ajuste l'inclinaison à votre force actuelle.</p>
          </div>
          <div className="value-box">
            <h3>Routine minimaliste</h3>
            <p>Pas de matériel complexe, pas de séances de 45 minutes. Juste de la régularité pure.</p>
          </div>
        </div>
      </section>

      <div className="footer-spacing"></div>

      <nav className="bottom-nav">
        <Link href="/" className="nav-item active">Accueil</Link>
        <Link href="/onboarding" className="nav-item">Bilan</Link>
        <Link href="/program" className="nav-item">Méthode</Link>
        <Link href="/progress" className="nav-item">Progrès</Link>
        <Link href="/premium" className="nav-item">Premium</Link>
      </nav>
    </main>
  )
}
