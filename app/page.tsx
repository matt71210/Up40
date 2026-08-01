import Link from 'next/link'

function PushIcon() {
  return (
    <div className="glow-icon" aria-hidden="true">
      <div className="glow-ring" />
      <div className="push-figure">
        <div className="push-head" />
        <div className="push-body" />
        <div className="push-arm" />
        <div className="push-core" />
        <div className="push-leg" />
        <div className="push-shin" />
        <div className="push-hand" />
        <div className="push-foot" />
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main>
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="kicker"><span className="kicker-dot" /> Longévité musculaire, sans ego</div>
          <h1 className="hero-title">Retrouve des pompes propres après 40 ans.</h1>
          <p className="hero-sub">
            Une app santé-performance pensée pour les adultes actifs qui veulent reprendre de la force sans s’abîmer les poignets,
            les épaules ou la motivation. Progression simple, séances courtes, langage clair, sensation premium.
          </p>
          <div className="row">
            <Link className="btn btn-primary" href="/onboarding">Faire mon diagnostic</Link>
            <Link className="btn btn-secondary" href="/program">Voir un aperçu du programme</Link>
          </div>
          <div className="hero-proof">
            <div className="proof-card"><span className="proof-label">Fréquence</span><span className="proof-value">3 séances</span></div>
            <div className="proof-card"><span className="proof-label">Durée</span><span className="proof-value">8–15 min</span></div>
            <div className="proof-card"><span className="proof-label">Focus</span><span className="proof-value">Force saine</span></div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-inner">
            <div className="panel-top">
              <span>Up40 preview</span>
              <span>Move better • Push stronger</span>
            </div>
            <div className="glow-app">
              <PushIcon />
              <div className="panel-stats">
                <div className="metric-card">
                  <div className="metric-value">Niv. 1</div>
                  <div className="metric-label">Incliné assisté</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">+18%</div>
                  <div className="metric-label">Contrôle semaine 2</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">J+21</div>
                  <div className="metric-label">Avant 1re vraie pompe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <h2 className="section-title">Une reprise plus élégante que le fitness brutal</h2>
        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-icon">01</div>
            <h3 className="feature-title">Départ réaliste</h3>
            <p className="feature-copy">Tu commences au bon palier, pas sur un challenge absurde. L’app s’adresse à la reprise, pas à l’ego.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">02</div>
            <h3 className="feature-title">Appuis respectés</h3>
            <p className="feature-copy">Poignets, épaules et sensation articulaire sont intégrés dans le parcours, avec une logique plus santé que bootcamp.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">03</div>
            <h3 className="feature-title">Progression visible</h3>
            <p className="feature-copy">Tu vois rapidement des jalons concrets : mur, incliné, excentrique, amplitude partielle, puis pompe propre complète.</p>
          </article>
        </div>
        <div className="mini-banner">
          <div>
            <strong>Positionnement voulu :</strong> une startup santé-performance plus premium, plus calme et plus crédible qu’une app fitness générique.
          </div>
          <Link href="/premium" className="btn btn-primary">Voir la version premium</Link>
        </div>
      </section>
    </main>
  )
}
