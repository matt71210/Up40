import Link from 'next/link'

export default function Progress() {
  return (
    <main className="min-h-screen bg-white">
      <header className="top-header">
        <div className="nav-container">
          <nav className="nav-bar">
            <Link href="/" className="logo-minimal">Up40.</Link>
            <div className="nav-links">
              <Link href="/program" className="nav-link">La méthode</Link>
              <Link href="/premium" className="nav-btn">Premium</Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="progress-container">
        <div className="progress-header">
          <div className="user-greeting">
            <div className="avatar-large">M</div>
            <div>
              <h1 className="display-title" style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>Vos progrès</h1>
              <p className="text-gray" style={{ margin: 0 }}>Semaine 3 • Objectif : Régularité</p>
            </div>
          </div>
        </div>

        <section className="stats-overview">
          <div className="stat-card">
            <span className="stat-label">Niveau Actuel</span>
            <strong className="stat-value">Incliné 1</strong>
            <span className="stat-trend text-brand">Palier 2/5</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Série en cours</span>
            <strong className="stat-value">2 sem.</strong>
            <span className="stat-trend">Objectif: 4 sem.</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Séances totales</span>
            <strong className="stat-value">8</strong>
            <span className="stat-trend text-gray">~96 min d'effort</span>
          </div>
        </section>

        <section className="milestone-section">
          <div className="milestone-header">
            <h3>Prochain palier : Incliné Bas</h3>
            <span className="text-brand font-semibold">65%</span>
          </div>
          <div className="milestone-bar-bg">
            <div className="milestone-bar-fill" style={{ width: '65%' }}></div>
          </div>
          <p className="milestone-desc">
            Encore 4 séances maîtrisées à ce niveau avant que l'algorithme ne vous propose de descendre l'inclinaison.
          </p>
        </section>

        <section className="consistency-section">
          <h3>Activité (30 derniers jours)</h3>
          <div className="heatmap-container">
            <div className="heatmap-grid">
              {/* Semaine 1 */}
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-1"></div>
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-1"></div>
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-0"></div>

              {/* Semaine 2 */}
              <div className="heat-cell heat-1"></div>
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-2"></div>
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-2"></div>
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-0"></div>

              {/* Semaine 3 */}
              <div className="heat-cell heat-2"></div>
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-2"></div>
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-3"></div>
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-0"></div>

              {/* Semaine 4 (Current) */}
              <div className="heat-cell heat-3"></div>
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-3"></div>
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-0 current-day"></div>
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-0"></div>
            </div>
            <div className="heatmap-legend">
              <span className="text-gray text-sm">Moins</span>
              <div className="heat-cell heat-0"></div>
              <div className="heat-cell heat-1"></div>
              <div className="heat-cell heat-2"></div>
              <div className="heat-cell heat-3"></div>
              <span className="text-gray text-sm">Plus</span>
            </div>
          </div>
        </section>

        <section className="history-section">
          <h3>Historique récent</h3>
          <div className="history-list">

            <div className="history-item">
              <div className="history-icon done">✓</div>
              <div className="history-details">
                <h4>Séance 8 : Volume Incliné</h4>
                <span className="text-gray text-sm">Aujourd'hui • 12 min • Facile</span>
              </div>
              <div className="history-action">
                <Link href="#" className="text-brand font-semibold text-sm">Détails</Link>
              </div>
            </div>

            <div className="history-item">
              <div className="history-icon done">✓</div>
              <div className="history-details">
                <h4>Séance 7 : Force Inclinée</h4>
                <span className="text-gray text-sm">Il y a 2 jours • 14 min • Modéré</span>
              </div>
              <div className="history-action">
                <Link href="#" className="text-brand font-semibold text-sm">Détails</Link>
              </div>
            </div>

            <div className="history-item">
              <div className="history-icon done">✓</div>
              <div className="history-details">
                <h4>Séance 6 : Contrôle</h4>
                <span className="text-gray text-sm">Il y a 4 jours • 11 min • Facile</span>
              </div>
              <div className="history-action">
                <Link href="#" className="text-brand font-semibold text-sm">Détails</Link>
              </div>
            </div>

          </div>
        </section>
      </div>

      <div className="footer-spacing"></div>

      <nav className="bottom-nav">
        <Link href="/" className="nav-item">Accueil</Link>
        <Link href="/onboarding" className="nav-item">Diagnostic</Link>
        <Link href="/program" className="nav-item">Méthode</Link>
        <Link href="/progress" className="nav-item active">Progrès</Link>
        <Link href="/premium" className="nav-item">Premium</Link>
      </nav>
    </main>
  )
}
