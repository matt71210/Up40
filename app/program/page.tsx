import Link from 'next/link'
import { getProgramAdjustment, buildProgramPlan, getSessionOfDay, ProfileInput } from '../../lib/program'
import { createClient } from '../../lib/supabase/client'

export default async function ProgramPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let adjustment = null
  let session = null

  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('current_push_level, pain_areas, has_pain, fitness_goal, height_cm, weight_kg')
      .eq('id', user.id)
      .single()

    if (data) {
      const profile = data as ProfileInput
      adjustment = getProgramAdjustment(profile)

      const plan = buildProgramPlan(adjustment)
      session = getSessionOfDay(adjustment, plan)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="top-header program-photo-hero">
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

      <section className="hero-section" style={{ minHeight: 'auto', paddingBottom: '2rem' }}>
        <div className="hero-content">
          <div className="badge-new">Plan Up40</div>
          <h1 className="display-title" style={{ fontSize: 'var(--text-xl)', maxWidth: '20ch' }}>
            Ta séance du jour
          </h1>
          {adjustment ? (
            <p className="hero-description" style={{ maxWidth: '46ch', fontSize: '1rem' }}>
              Niveau de départ&nbsp;: <strong>{adjustment.title}</strong>. Trois séances par semaine, sur un cycle de {adjustment.cycleWeeks} semaines.
            </p>
          ) : (
            <p className="hero-description" style={{ maxWidth: '46ch', fontSize: '1rem' }}>
              Connecte-toi et réalise ton bilan pour voir ta séance du jour.
            </p>
          )}
        </div>
      </section>

      <section className="program-container">
        {session ? (
          <>
            <div className="program-header">
              <h2 className="display-title" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                {session.title}
              </h2>
              <p className="hero-description" style={{ fontSize: '0.95rem', maxWidth: '48ch' }}>
                Séance centrée sur <strong>{session.focus === 'technique' ? 'la technique' : session.focus === 'volume' ? 'un volume tolérable' : 'le contrôle excentrique'}</strong>.
              </p>
            </div>

            <div className="timeline">
              {session.blocks.map((block, index) => (
                <div key={index} className="timeline-item">
                  <div className={index === 0 ? 'timeline-marker highlight-marker' : 'timeline-marker'}>
                    {index + 1}
                  </div>
                  <div className={index === 0 ? 'timeline-content border-highlight' : 'timeline-content'}>
                    <div className={index === 0 ? 'level-badge highlight-badge' : 'level-badge'}>
                      Bloc {index + 1}
                    </div>
                    <h3>{block.name}</h3>
                    <p>{block.description}</p>
                    <div className="level-details">
                      {block.sets && block.reps && (
                        <span className={index === 0 ? 'detail-tag highlight-tag' : 'detail-tag'}>
                          {block.sets} séries de {block.reps} répétitions
                        </span>
                      )}
                      {block.tempo && (
                        <span className="detail-tag">Tempo&nbsp;: {block.tempo}</span>
                      )}
                      {block.restSeconds && (
                        <span className="detail-tag">Repos&nbsp;: {block.restSeconds} secondes</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="weekly-routine">
              <h3>Rythme de la semaine</h3>
              <div className="routine-grid">
                <div className="routine-card">
                  <div className="routine-icon">1</div>
                  <h4>Séance technique</h4>
                  <p>Travail sur la trajectoire, la stabilité et la mise en route.</p>
                </div>
                <div className="routine-card">
                  <div className="routine-icon">2</div>
                  <h4>Séance contrôle</h4>
                  <p>Descente plus lente, contrôle de la charge et du placement.</p>
                </div>
                <div className="routine-card">
                  <div className="routine-icon">3</div>
                  <h4>Séance volume</h4>
                  <p>Volume tolérable à un niveau confortable, pour construire l’habitude.</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="program-header">
            <p className="hero-description" style={{ fontSize: '1rem' }}>
              Aucune séance du jour disponible. Assure-toi d’avoir réalisé ton bilan et d’être connecté.
            </p>
          </div>
        )}
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
