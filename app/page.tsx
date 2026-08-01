import Link from 'next/link'

export default function Page() {
  return (
    <main className="min-h-screen bg-base">
      <header className="top-shell">
        <div className="topbar-v31">
          <div className="brand-block">
            <div className="brand-mark">Up40.</div>
            <p className="brand-sub">Des pompes propres, après 40 ans.</p>
          </div>
          <div className="top-actions">
            <Link href="/program" className="ghost-link">Méthode</Link>
            <Link href="/premium" className="cta-mini">Premium</Link>
          </div>
        </div>
      </header>

      <section className="hero-v31">
        <div className="hero-copy-v31">
          <div className="eyebrow-v31">Progression douce · biomécanique adulte · zéro ego</div>
          <h1 className="display-v31">
            Des pompes solides.<br />
            <span>Sans casser vos épaules.</span>
          </h1>
          <p className="desc-v31">
            Up40 transforme la reprise du haut du corps en parcours simple, élégant et progressif. Vous avancez avec des séances courtes,
            des paliers réalistes et une logique pensée pour durer, pas pour vous cramer.
          </p>
          <div className="cta-row-v31">
            <Link href="/onboarding" className="btn-primary-v31">Faire mon diagnostic</Link>
            <Link href="/program" className="btn-secondary-v31">Voir la méthode</Link>
          </div>
          <div className="trust-row-v31">
            <div className="trust-pill"><strong>12 min</strong><span>par séance</span></div>
            <div className="trust-pill"><strong>3x / semaine</strong><span>rythme durable</span></div>
            <div className="trust-pill"><strong>Sans matériel</strong><span>ou presque</span></div>
          </div>
        </div>

        <div className="hero-device-v31">
          <div className="device-card">
            <div className="device-topline">
              <span className="device-state">Prêt aujourd'hui</span>
              <span className="device-score">Score 82</span>
            </div>

            <div className="progress-ring-wrap">
              <div className="ring-core">
                <div className="ring-inner">
                  <span className="ring-label">Bloc du jour</span>
                  <strong>Pompes inclinées</strong>
                  <p>Niveau 2 · 4 x 8 répétitions</p>
                </div>
              </div>
            </div>

            <div className="device-stats-grid">
              <div className="mini-card active">
                <span>Préparation</span>
                <strong>3 min</strong>
              </div>
              <div className="mini-card">
                <span>Volume</span>
                <strong>32 reps</strong>
              </div>
              <div className="mini-card">
                <span>Objectif</span>
                <strong>1 pompe nette</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-v31">
        <article className="benefit-card">
          <h3>Reprise intelligente</h3>
          <p>On part de votre vrai niveau, pas d’un fantasme sportif. Le système ajuste l’intensité avant que la douleur s’installe.</p>
        </article>
        <article className="benefit-card">
          <h3>Articulations respectées</h3>
          <p>Le programme valorise les appuis, le contrôle, l’inclinaison et le tempo pour protéger épaules, poignets et motivation.</p>
        </article>
        <article className="benefit-card">
          <h3>Régularité premium</h3>
          <p>Une UX claire, peu de friction, et des séances courtes pour transformer la discipline en routine réaliste.</p>
        </article>
      </section>

      <nav className="bottomnav-v31" aria-label="Navigation principale mobile">
        <Link href="/" className="nav-item active">Accueil</Link>
        <Link href="/onboarding" className="nav-item">Diagnostic</Link>
        <Link href="/program" className="nav-item">Programme</Link>
        <Link href="/progress" className="nav-item">Progrès</Link>
        <Link href="/premium" className="nav-item">Premium</Link>
      </nav>
      <div className="footerSpace"></div>
    </main>
  )
}
