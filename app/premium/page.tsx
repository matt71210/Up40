import Link from 'next/link'

export default function Premium() {
  return (
    <main className="min-h-screen bg-white" style={{ position: 'relative' }}>
      {/* Abstract Background pattern */}
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
            Zéro risque, zéro carte bancaire
          </div>
          <h1 className="display-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Reconstruisez-vous.<br/>
            <span style={{ color: 'var(--text-gray)' }}>On vous offre les 14 premiers jours.</span>
          </h1>
          <p className="hero-description mx-auto mt-4">
            Testez le programme adapté à votre niveau, installez la routine, et constatez par vous-même la disparition des douleurs articulaires. 
            Aucun moyen de paiement n'est requis pour démarrer.
          </p>
        </section>

        <section className="pricing-grid">

          {/* Free Trial Card */}
          <div className="pricing-card trial-card">
            <div className="pricing-header">
              <h3>Phase d'Essai</h3>
              <div className="price-block">
                <span className="price">0€</span>
                <span className="duration">pour 14 jours</span>
              </div>
              <p className="pricing-desc">Testez la méthode complète, créez l'habitude.</p>
            </div>

            <ul className="feature-list">
              <li><span className="check">✓</span> Diagnostic biomécanique complet</li>
              <li><span className="check">✓</span> Programme personnalisé (tous niveaux)</li>
              <li><span className="check">✓</span> Accès au tracker de progrès</li>
              <li><span className="check">✓</span> Zéro carte bancaire à l'inscription</li>
              <li className="faded"><span className="cross">×</span> Conservation des données après 14j</li>
              <li className="faded"><span className="cross">×</span> Accès aux paliers de spécialisation</li>
            </ul>

            <Link href="/onboarding" className="btn-outline w-full text-center block mt-8" style={{ border: '2px solid var(--text-main)' }}>
              Démarrer gratuitement
            </Link>
          </div>

          {/* Premium Lifetime Card */}
          <div className="pricing-card premium-card">
            <div className="popular-badge">Recommandé</div>
            <div className="pricing-header">
              <h3>Up40 Premium</h3>
              <div className="price-block">
                <span className="price">49€</span>
                <span className="duration">paiement unique</span>
              </div>
              <p className="pricing-desc">L'accès à vie. Pas d'abonnement toxique, jamais.</p>
            </div>

            <ul className="feature-list">
              <li><span className="check brand-check">✓</span> <strong>Tout l'essai gratuit, plus :</strong></li>
              <li><span className="check brand-check">✓</span> Accès à vie, sans abonnement</li>
              <li><span className="check brand-check">✓</span> Déblocage de tous les paliers avancés</li>
              <li><span className="check brand-check">✓</span> Algorithme d'adaptation de charge</li>
              <li><span className="check brand-check">✓</span> Historique et Heatmap illimités</li>
              <li><span className="check brand-check">✓</span> Modules spécifiques (Tendons, Mobilité)</li>
            </ul>

            <Link href="#" className="btn-dark w-full text-center block mt-8" style={{ padding: '1.2rem 1.8rem', fontSize: '1.1rem' }}>
              Débloquer à vie
            </Link>
            <p className="guarantee-text text-center mt-4 text-sm text-gray">
              Paiement sécurisé via Stripe. 
            </p>
          </div>

        </section>

        <section className="faq-section">
          <h3 className="text-center mb-8" style={{ fontSize: '1.8rem', fontWeight: 800 }}>Questions fréquentes</h3>

          <div className="faq-grid">
            <div className="faq-item">
              <h4>Que se passe-t-il après 14 jours ?</h4>
              <p>Votre accès se met en pause. Vous ne serez pas prélevé car nous n'avons pas votre carte. Vous pourrez alors choisir de passer Premium à 49€ ou d'arrêter.</p>
            </div>
            <div className="faq-item">
              <h4>Pourquoi un paiement unique ?</h4>
              <p>À 40 ans, on est fatigué des abonnements qui s'accumulent (Netflix, salle de sport, apps). Up40 est un outil de vie : vous l'achetez une fois, il est à vous pour toujours.</p>
            </div>
            <div className="faq-item">
              <h4>Le programme est-il vraiment pour moi si j'ai déjà un bon niveau ?</h4>
              <p>Oui. Le diagnostic initial évaluera votre niveau. Si vous faites déjà 20 pompes mais avez mal aux épaules, l'algorithme vous prescrira un protocole avancé axé sur la réparation tendineuse.</p>
            </div>
            <div className="faq-item">
              <h4>Faut-il du matériel ?</h4>
              <p>Non, l'essentiel se fait au poids du corps avec le mobilier (chaise, table, mur). Nous recommandons simplement des sangles de suspension ou des poignées pour un confort optimal.</p>
            </div>
          </div>
        </section>

      </div>

      <div className="footer-spacing"></div>

      <nav className="bottom-nav">
        <Link href="/" className="nav-item">Accueil</Link>
        <Link href="/onboarding" className="nav-item">Diagnostic</Link>
        <Link href="/program" className="nav-item">Méthode</Link>
        <Link href="/progress" className="nav-item">Progrès</Link>
        <Link href="/premium" className="nav-item active">Premium</Link>
      </nav>
    </main>
  )
}
