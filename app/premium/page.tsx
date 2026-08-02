import Link from 'next/link'

export default function Premium() {
  return (
    <main className="min-h-screen bg-white" style={{ position: 'relative' }}>
      <div className="premium-bg"></div>

      <header className="top-header" style={{ background: 'transparent', borderBottom: 'none' }}>
        <div className="nav-container">
          <nav className="nav-bar">
            <Link href="/" className="logo-minimal">Up40.</Link>
            <div className="nav-links">
              <Link href="/program" className="nav-link">La méthode</Link>
              <Link href="/premium" className="nav-btn" style={{ background: 'var(--brand)', color: 'white' }}>Premium</Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="premium-container">

        <section className="premium-hero text-center">
          <div className="badge-new mx-auto" style={{ background: 'rgba(15,111,103,0.08)', color: 'var(--brand)', borderColor: 'rgba(15,111,103,0.2)' }}>
            14 jours offerts • Sans engagement
          </div>
          <h1 className="display-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Investissez dans votre<br/>
            <span style={{ color: 'var(--text-gray)' }}>seul vrai capital.</span>
          </h1>
          <p className="hero-description mx-auto mt-4">
            Testez l'algorithme, découvrez un confort articulaire retrouvé et mettez en place la routine. 
            Aucune carte bancaire requise pour démarrer vos 14 premiers jours.
          </p>
        </section>

        <section className="pricing-grid">

          {/* Trimestriel */}
          <div className="pricing-card trial-card">
            <div className="pricing-header">
              <h3>Cycle 3 Mois</h3>
              <div className="price-block">
                <span className="price">29€</span>
                <span className="duration">/ trimestre</span>
              </div>
              <p className="pricing-desc">Idéal pour valider les 3 premiers paliers de la méthode.</p>
            </div>

            <ul className="feature-list">
              <li><span className="check brand-check">✓</span> <strong>14 jours d'essai gratuits</strong></li>
              <li><span className="check">✓</span> Algorithme de progression</li>
              <li><span className="check">✓</span> Tracker de régularité</li>
              <li><span className="check">✓</span> Modules de mobilité</li>
              <li><span className="check">✓</span> Annulable en un clic</li>
            </ul>

            <Link href="/onboarding" className="btn-outline w-full text-center block mt-8" style={{ border: '2px solid var(--text-main)' }}>
              Démarrer l'essai
            </Link>
            <p className="guarantee-text text-center mt-4 text-sm text-gray">
              Soit 9,60€ par mois
            </p>
          </div>

          {/* Annuel */}
          <div className="pricing-card premium-card">
            <div className="popular-badge">Le plus rentable</div>
            <div className="pricing-header">
              <h3>Pass Annuel</h3>
              <div className="price-block">
                <span className="price">79€</span>
                <span className="duration">/ an</span>
              </div>
              <p className="pricing-desc">Un an pour reconstruire entièrement et durablement le haut de votre corps.</p>
            </div>

            <ul className="feature-list">
              <li><span className="check brand-check">✓</span> <strong>14 jours d'essai gratuits</strong></li>
              <li><span className="check brand-check">✓</span> Économisez 30% sur l'année</li>
              <li><span className="check brand-check">✓</span> Tous les paliers débloqués</li>
              <li><span className="check brand-check">✓</span> Nouveaux protocoles inclus</li>
              <li><span className="check brand-check">✓</span> Support prioritaire</li>
            </ul>

            <Link href="#" className="btn-dark w-full text-center block mt-8" style={{ padding: '1.2rem 1.8rem', fontSize: '1.1rem' }}>
              Démarrer avec le Pass Annuel
            </Link>
            <p className="guarantee-text text-center mt-4 text-sm text-gray" style={{ color: 'var(--brand)' }}>
              Soit 6,58€ par mois
            </p>
          </div>

        </section>

        <section className="faq-section">
          <h3 className="text-center mb-8" style={{ fontSize: '1.8rem', fontWeight: 800 }}>Questions fréquentes</h3>

          <div className="faq-grid">
            <div className="faq-item">
              <h4>Comment fonctionne l'essai de 14 jours ?</h4>
              <p>Vous créez votre compte sans entrer de carte bancaire. Vous accédez à 100% de l'application. Au bout de 14 jours, l'application se met en pause et vous propose de choisir un abonnement pour continuer votre progression.</p>
            </div>
            <div className="faq-item">
              <h4>Pourquoi un abonnement plutôt qu'un achat unique ?</h4>
              <p>Parce que la méthode évolue. Nous ajoutons en permanence de nouveaux paliers de spécialisation (gilet lesté, anneaux), de nouvelles routines de mobilité, et nous maintenons l'algorithme de suivi au quotidien.</p>
            </div>
            <div className="faq-item">
              <h4>Puis-je annuler facilement ?</h4>
              <p>Oui. Un bouton "Annuler" est disponible directement dans vos paramètres. Pas de mail à envoyer, pas de préavis caché.</p>
            </div>
            <div className="faq-item">
              <h4>Faut-il du matériel ?</h4>
              <p>Non, l'essentiel se fait au poids du corps avec le mobilier (chaise, table, mur). Nous recommandons simplement des sangles de suspension ou des poignées pour un confort optimal si vous le souhaitez.</p>
            </div>
          </div>
        </section>

      </div>

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
