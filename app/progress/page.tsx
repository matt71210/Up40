import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

export default function Progress() {
  return (
    <main className="min-h-screen bg-white">
      <header className="top-header">
        <div className="nav-container">
          <nav className="nav-bar">
            <Link href="/" className="logo-minimal">Up40.</Link>
            <div className="nav-actions">
              <Link href="/onboarding" className="nav-link">Bilan</Link>
              <Link href="/program" className="nav-link">Méthode</Link>
              <Link href="/progress" className="nav-link">Progrès</Link>
              <Link href="/premium" className="nav-link" style={{ color: 'var(--brand)', fontWeight: 600 }}>Premium</Link>
              <ThemeToggle />
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
            <h3>Prochain palier : Incliné Bas (~40cm)</h3>
            <span className="text-brand font-semibold">65%</span>
          </div>
          <div className="milestone-bar-bg">
            <div className="milestone-bar-fill" style={{ width: '65%' }}></div>
          </div>
          <p className="milestone-desc">
            Encore 4 séances maîtrisées à ce niveau avant que l'algorithme ne vous propose de descendre l'inclinaison vers un banc ou une marche.
          </p>
        </section>

        <section className="consistency-section">
          <div className="flex-between">
            <h3>Activité (Août)</h3>
            <span className="text-brand font-semibold text-sm">8 séances</span>
          </div>
          <div className="calendar-container">
            <div className="calendar-grid">
              <div className="day-name">L</div>
              <div className="day-name">M</div>
              <div className="day-name">M</div>
              <div className="day-name">J</div>
              <div className="day-name">V</div>
              <div className="day-name">S</div>
              <div className="day-name">D</div>

              {/* Jours vides du mois (offset) */}
              <div className="cal-cell empty"></div>
              <div className="cal-cell empty"></div>
              <div className="cal-cell empty"></div>
              <div className="cal-cell empty"></div>

              {/* Jours du mois */}
              <div className="cal-cell heat-3">1</div>
              <div className="cal-cell heat-0">2</div>
              <div className="cal-cell heat-0">3</div>

              <div className="cal-cell heat-3">4</div>
              <div className="cal-cell heat-0">5</div>
              <div className="cal-cell heat-2">6</div>
              <div className="cal-cell heat-0">7</div>
              <div className="cal-cell heat-2">8</div>
              <div className="cal-cell heat-0">9</div>
              <div className="cal-cell heat-0">10</div>

              <div className="cal-cell heat-3">11</div>
              <div className="cal-cell heat-0">12</div>
              <div className="cal-cell heat-3">13</div>
              <div className="cal-cell heat-0">14</div>
              <div className="cal-cell heat-3 current-day">15</div>
              <div className="cal-cell heat-0">16</div>
              <div className="cal-cell heat-0">17</div>

              {/* Future days */}
              <div className="cal-cell heat-0 text-faint">18</div>
              <div className="cal-cell heat-0 text-faint">19</div>
              <div className="cal-cell heat-0 text-faint">20</div>
              <div className="cal-cell heat-0 text-faint">21</div>
              <div className="cal-cell heat-0 text-faint">22</div>
              <div className="cal-cell heat-0 text-faint">23</div>
              <div className="cal-cell heat-0 text-faint">24</div>
            </div>
            <div className="heatmap-legend mt-4">
              <span className="text-gray text-sm">Repos</span>
              <div className="cal-cell heat-0" style={{width: 16, height: 16, borderRadius: 4}}></div>
              <div className="cal-cell heat-2" style={{width: 16, height: 16, borderRadius: 4}}></div>
              <div className="cal-cell heat-3" style={{width: 16, height: 16, borderRadius: 4}}></div>
              <span className="text-gray text-sm">Séance</span>
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
                <span className="text-gray text-sm">Aujourd'hui • 12 min • Plan de travail</span>
              </div>
              <div className="history-action">
                <Link href="#" className="text-brand font-semibold text-sm">Détails</Link>
              </div>
            </div>

            <div className="history-item">
              <div className="history-icon done">✓</div>
              <div className="history-details">
                <h4>Séance 7 : Force Inclinée</h4>
                <span className="text-gray text-sm">13 Août • 14 min • Plan de travail</span>
              </div>
              <div className="history-action">
                <Link href="#" className="text-brand font-semibold text-sm">Détails</Link>
              </div>
            </div>

            <div className="history-item">
              <div className="history-icon done">✓</div>
              <div className="history-details">
                <h4>Séance 6 : Contrôle</h4>
                <span className="text-gray text-sm">11 Août • 11 min • Plan de travail</span>
              </div>
              <div className="history-action">
                <Link href="#" className="text-brand font-semibold text-sm">Détails</Link>
              </div>
            </div>

          </div>
        </section>
      </div>

      

      
    </main>
  )
}
