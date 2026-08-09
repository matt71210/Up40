import Link from 'next/link'

export default function ProgramPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="top-header transparent">
        <div className="nav-container">
          <nav className="nav-bar">
            <Link href="/" className="logo-minimal">Up40.</Link>
            <div className="nav-actions" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="nav-links">
                <Link href="/program" className="nav-link active">Méthode</Link>
                <Link href="/premium" className="nav-btn">Premium</Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero-section photo-hero" style={{ minHeight: 'auto', paddingBottom: '2rem' }}>
        <div className="hero-content">
          <div className="badge-new">Méthode Up40</div>
          <h1 className="display-title" style={{ fontSize: 'var(--text-xl)', maxWidth: '20ch' }}>
            Comment fonctionne ton plan
          </h1>
          <p className="hero-description" style={{ maxWidth: '46ch', fontSize: '1rem' }}>
            La méthode Up40 repose sur des cycles courts, des séances lisibles et des paliers de progression réalistes. L’objectif n’est pas d’empiler les exercices, mais de créer une base solide que tu peux entretenir longtemps.
          </p>
        </div>
      </section>

      <section className="value-section">
        <div className="value-grid">
          <div className="value-box">
            <h3>1. Des cycles courts</h3>
            <p>Chaque plan est structuré en cycles de quelques semaines. Cela te permet de voir clairement où tu en es, de mesurer tes progrès, et d’ajuster sans repartir de zéro à chaque fois.</p>
          </div>
          <div className="value-box">
            <h3>2. Une séance du jour</h3>
            <p>Tu ne choisis pas parmi des dizaines d’options. Une séance du jour, adaptée à ton niveau de départ, avec un volume que tu peux réellement tenir dans ton quotidien.</p>
          </div>
          <div className="value-box">
            <h3>3. Des paliers lisibles</h3>
            <p>La méthode ne te demande pas d’« aller au-delà » à chaque séance. Les paliers sont définis à l’avance, avec des critères simples pour savoir quand passer au niveau suivant.</p>
          </div>
        </div>
      </section>

      <section className="value-section" style={{ paddingTop: 0 }}>
        <div className="value-grid">
          <div className="value-box" style={{ gridColumn: 'span 2' }}>
            <h3>Une place pour les articulations</h3>
            <p>Les zones sensibles que tu as indiquées lors du bilan (épaules, poignets, coudes, bas du dos) sont prises en compte dans la façon dont les exercices sont proposés. On ne promet pas d’« effacer » les gênes, mais de construire une tolérance en respectant les contraintes du corps.</p>
          </div>
          <div className="value-box">
            <h3>Une place pour le quotidien</h3>
            <p>Le plan est pensé pour s’intégrer dans une vie active, pas pour devenir un nouveau centre de gravité. Trois séances courtes par semaine suffisent pour créer une progression, si elles sont faites avec constance.</p>
          </div>
        </div>
      </section>

      <section className="value-section" style={{ paddingTop: 0 }}>
        <div className="value-grid">
          <div className="value-box" style={{ gridColumn: 'span 3' }}>
            <h3>Comment utiliser la méthode</h3>
            <p>La bonne façon d’utiliser Up40 n’est pas de « rattraper » les séances manquées ni de doubler les volumes. C’est de considérer chaque séance comme un rendez-vous raisonnable avec ton corps : tu y vas, tu fais ce qui est prévu, tu notes ce qui change, et tu laisses le plan ajuster les paliers.</p>
          </div>
        </div>
      </section>

      <div className="footer-spacing"></div>

      <nav className="bottom-nav">
        <Link href="/" className="nav-item">Accueil</Link>
        <Link href="/onboarding" className="nav-item">Bilan</Link>
        <Link href="/program" className="nav-item active">Méthode</Link>
        <Link href="/progress" className="nav-item">Progrès</Link>
        <Link href="/premium" className="nav-item">Premium</Link>
      </nav>
    </main>
  )
}
