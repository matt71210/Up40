import Link from 'next/link'

function PushSketch() {
  return (
    <svg viewBox="0 0 420 420" className="pushSvg" aria-hidden="true">
      <defs>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x="26" y="26" width="368" height="368" rx="54" fill="#141b24" />
      <circle cx="210" cy="210" r="132" fill="none" stroke="#f6fbff" strokeWidth="5" filter="url(#softGlow)" />
      <circle cx="136" cy="176" r="14" fill="#f6fbff" />
      <path d="M156 190 L188 190 L205 208 L252 214 L291 236 L324 236" fill="none" stroke="#f6fbff" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M177 202 L177 270" fill="none" stroke="#f6fbff" strokeWidth="16" strokeLinecap="round" />
      <path d="M164 270 L196 270" fill="none" stroke="#f6fbff" strokeWidth="16" strokeLinecap="round" />
      <path d="M324 236 L340 266" fill="none" stroke="#f6fbff" strokeWidth="16" strokeLinecap="round" />
      <path d="M328 266 L355 266" fill="none" stroke="#f6fbff" strokeWidth="16" strokeLinecap="round" />
    </svg>
  )
}

export default function Page() {
  return (
    <main className="landingPage">
      <section className="landingHero">
        <div className="heroText cardGlass">
          <div className="eyebrow">Up40 · Force, mobilité, reprise intelligente</div>
          <h1 className="landingTitle">Retrouve des pompes propres sans reprendre comme à 20 ans.</h1>
          <p className="landingSub">
            Up40 aide les adultes actifs à reconstruire une vraie force du haut du corps avec un parcours plus calme,
            plus crédible et plus respectueux des poignets, des épaules et de la récupération.
          </p>
          <div className="ctaRow">
            <Link href="/onboarding" className="btn btn-primary">Faire mon diagnostic</Link>
            <Link href="/program" className="btn btn-secondary">Voir le programme</Link>
          </div>
          <div className="trustRow">
            <div className="trustItem"><strong>3x / semaine</strong><span>routine simple</span></div>
            <div className="trustItem"><strong>8–15 min</strong><span>séances courtes</span></div>
            <div className="trustItem"><strong>40+</strong><span>pensé pour la reprise</span></div>
          </div>
        </div>

        <div className="heroShot cardDark">
          <div className="productWindow">
            <div className="windowBar">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="windowLabel">today / readiness / push strength</span>
            </div>
            <div className="previewGrid">
              <div className="haloTile">
                <PushSketch />
              </div>
              <div className="statRail">
                <div className="statMini">
                  <span className="miniLabel">Niveau conseillé</span>
                  <strong>Incliné 1</strong>
                  <p>Départ stable avec travail d'appuis et contrôle.</p>
                </div>
                <div className="statMini">
                  <span className="miniLabel">Séance du jour</span>
                  <strong>12 minutes</strong>
                  <p>Activation épaules, séries inclinées, gainage.</p>
                </div>
                <div className="statMini highlight">
                  <span className="miniLabel">Objectif</span>
                  <strong>1 vraie pompe propre</strong>
                  <p>Sans douleur inutile ni surcharge absurde.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="highlightBar">
        <div>
          <span className="barLabel">Pourquoi Up40 paraît plus crédible</span>
          <h2>Moins fitness générique, plus produit santé-performance.</h2>
        </div>
        <p>
          Le message, la hiérarchie et le visuel montrent un produit de progression, pas juste un challenge de pompes.
        </p>
      </section>

      <section className="featureDeck">
        <article className="featurePanel">
          <div className="featureIndex">01</div>
          <h3>Départ réaliste</h3>
          <p>Tu commences au bon palier selon ton niveau, pas sur une promesse héroïque impossible à tenir.</p>
        </article>
        <article className="featurePanel">
          <div className="featureIndex">02</div>
          <h3>Appuis respectés</h3>
          <p>Poignets, épaules et récupération font partie de l'expérience, avec une tonalité plus calme et plus adulte.</p>
        </article>
        <article className="featurePanel">
          <div className="featureIndex">03</div>
          <h3>Progression visible</h3>
          <p>Chaque palier montre une amélioration concrète, du mur jusqu'à la première vraie pompe complète.</p>
        </article>
      </section>
    </main>
  )
}
