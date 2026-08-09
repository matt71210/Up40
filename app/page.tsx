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
          <p className="hero-description" style={{ maxWidth: '48ch' }}>
            À partir d’un certain âge, le problème n’est pas de « tout donner » à la salle. C’est de trouver une façon raisonnable de redevenir fort, sans sacrifier les épaules, les poignets ou le bas du dos. Up40 propose un cadre simple pour reprendre sérieusement, avec des séances courtes, régulières et lisibles.
          </p>
          <p className="hero-description muted" style={{ maxWidth: '48ch', marginTop: '0.75rem' }}>
            Pas de compétition, pas de jargon. Juste un point de départ adapté, des repères clairs, et une progression qui respecte le corps que vous avez aujourd’hui.
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
                  <div className="app-greeting">Bonjour</div>
                </div>
                <div className="app-avatar">U</div>
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

              <div className="task-card">
                <div className="task-details">
                  <h4>Préparation articulaire</h4>
                  <p>3 min • Poignets & Épaules</p>
                </div>
              </div>

              <div className="task-card">
                <div className="task-details">
                  <h4>Pompes inclinées</h4>
                  <p>4 séries de 8 • Tempo contrôlé</p>
                </div>
              </div>

              <div className="task-card">
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
            <p>Chaque étape privilégie le placement, la stabilité et le respect articulaire avant le volume. L’objectif est de pouvoir continuer longtemps, pas de « tenir » quelques semaines.</p>
          </div>
          <div className="value-box">
            <h3>Des paliers réalistes</h3>
            <p>On ne part pas du sol si ce n’est pas le bon point de départ. La progression s’ajuste à votre niveau réel, pour éviter les à-coups et les blessures inutiles.</p>
          </div>
          <div className="value-box">
            <h3>Une routine claire</h3>
            <p>Pas de protocole compliqué, pas de charge mentale. Vous savez quoi faire, quand le faire, et ce que vous cherchez à améliorer à chaque séance.</p>
          </div>
        </div>
      </section>

      <section className="value-section" style={{ paddingTop: 0 }}>
        <div className="value-grid">
          <div className="value-box" style={{ gridColumn: 'span 2' }}>
            <h3>Pourquoi Up40</h3>
            <p>Parce qu’à 45, 50 ou 60 ans, on ne s’entraîne plus comme à 20. On a besoin d’un cadre qui accepte là où on en est, qui respecte les contraintes du quotidien, et qui propose une progression réaliste plutôt qu’un nouveau défi à cocher.</p>
          </div>
          <div className="value-box">
            <h3>Pour qui</h3>
            <p>Pour celles et ceux qui veulent reprendre sérieusement, sans jargon ni surenchère marketing, avec une méthode sobre, structurée et lisible.</p>
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
