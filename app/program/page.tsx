import Link from 'next/link'

export default function Program() {
  return (
    <main className="min-h-screen bg-white">
      <header className="top-header">
        <div className="nav-container">
          <nav className="nav-bar">
            <Link href="/" className="logo-minimal">Up40.</Link>
            <div className="nav-links">
              <Link href="/program" className="nav-link" style={{ color: 'var(--brand)' }}>La méthode</Link>
              <Link href="/premium" className="nav-btn">Premium</Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="program-container">
        <section className="program-header text-center">
          <div className="badge-new mx-auto">La Méthode Up40</div>
          <h1 className="display-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            Biomécanique & Progression.
          </h1>
          <p className="hero-description mx-auto">
            Le but n'est pas d'enchaîner 100 répétitions cassées, mais de reconstruire une force solide et saine. Voici le chemin exact, palier par palier, pour y arriver.
          </p>
        </section>

        <section className="timeline-section">
          <div className="timeline">

            {/* Niveau 1 */}
            <div className="timeline-item">
              <div className="timeline-marker">1</div>
              <div className="timeline-content">
                <div className="level-badge">Semaines 1-2</div>
                <h3>Fondations : Appui Mur</h3>
                <p>Réveil du système nerveux. On réapprend à gainer la sangle abdominale et à placer les omoplates sans aucune charge sur les poignets.</p>
                <div className="level-details">
                  <span className="detail-tag">Focus: Alignement</span>
                  <span className="detail-tag">Charge: ~20% pdc</span>
                </div>
              </div>
            </div>

            {/* Niveau 2 */}
            <div className="timeline-item">
              <div className="timeline-marker">2</div>
              <div className="timeline-content">
                <div className="level-badge">Semaines 3-4</div>
                <h3>Incliné Haut (Banc/Table)</h3>
                <p>Introduction de la charge. Le buste descend vers les mains. C'est ici que l'on construit le volume propre et l'endurance des triceps.</p>
                <div className="level-details">
                  <span className="detail-tag">Focus: Volume</span>
                  <span className="detail-tag">Charge: ~40% pdc</span>
                </div>
              </div>
            </div>

            {/* Niveau 3 */}
            <div className="timeline-item">
              <div className="timeline-marker">3</div>
              <div className="timeline-content">
                <div className="level-badge">Semaines 5-6</div>
                <h3>Incliné Bas (Marche/Chaise)</h3>
                <p>La charge devient sérieuse. On réduit l'inclinaison. Le gainage doit être parfait pour ne pas creuser le dos. Les pectoraux prennent le relais.</p>
                <div className="level-details">
                  <span className="detail-tag">Focus: Force de poussée</span>
                  <span className="detail-tag">Charge: ~55% pdc</span>
                </div>
              </div>
            </div>

            {/* Niveau 4 */}
            <div className="timeline-item">
              <div className="timeline-marker">4</div>
              <div className="timeline-content">
                <div className="level-badge">Semaines 7-8</div>
                <h3>L'Excentrique (Sol)</h3>
                <p>On passe au sol, mais uniquement sur la descente (très lente, 4 secondes). La remontée se fait sur les genoux. Idéal pour renforcer les tendons.</p>
                <div className="level-details">
                  <span className="detail-tag">Focus: Tissus conjonctifs</span>
                  <span className="detail-tag">Charge: 100% pdc (descente)</span>
                </div>
              </div>
            </div>

            {/* Niveau 5 */}
            <div className="timeline-item">
              <div className="timeline-marker highlight-marker">5</div>
              <div className="timeline-content border-highlight">
                <div className="level-badge highlight-badge">Semaines 9+</div>
                <h3>La Pompe Parfaite</h3>
                <p>Corps gainé, descente contrôlée, buste frôlant le sol, poussée explosive. Vous avez reconstruit votre force, sans douleur.</p>
                <div className="level-details">
                  <span className="detail-tag highlight-tag">Focus: Maîtrise totale</span>
                  <span className="detail-tag highlight-tag">Charge: ~70% pdc</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="weekly-routine">
          <h2 className="text-center mb-8" style={{ fontSize: '1.8rem', fontWeight: 800 }}>Votre routine type (12 min)</h2>
          <div className="routine-grid">
            <div className="routine-card">
              <div className="routine-icon">1</div>
              <h4>Mobilité (3 min)</h4>
              <p>Rotations des poignets, cercles d'épaules, ouverture thoracique.</p>
            </div>
            <div className="routine-card">
              <div className="routine-icon">2</div>
              <h4>Travail ciblé (6 min)</h4>
              <p>4 séries de votre palier actuel. Récupération active entre les séries.</p>
            </div>
            <div className="routine-card">
              <div className="routine-icon">3</div>
              <h4>Gainage (3 min)</h4>
              <p>Planche stricte ou hollow body pour solidifier le transfert de force.</p>
            </div>
          </div>
        </section>

        <div className="text-center mt-4">
          <Link href="/onboarding" className="btn-dark">Commencer mon programme</Link>
        </div>
      </div>

      <div className="footer-spacing"></div>

      <nav className="bottom-nav">
        <Link href="/" className="nav-item">Accueil</Link>
        <Link href="/onboarding" className="nav-item">Diagnostic</Link>
        <Link href="/program" className="nav-item active">Méthode</Link>
        <Link href="/progress" className="nav-item">Progrès</Link>
        <Link href="/premium" className="nav-item">Premium</Link>
      </nav>
    </main>
  )
}
