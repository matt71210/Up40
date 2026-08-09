'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'
import { getProgramAdjustment, type ProfileInput } from '../../lib/program'

type Profile = ProfileInput & {
  id?: string
}

function IconCheck() {
  return <span className="result-check">✓</span>
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="result-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default function ResultPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    async function waitForAuth() {
      const supabase = createClient()
      let attempts = 0
      while (attempts < 50) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) break
        await new Promise(resolve => setTimeout(resolve, 100))
        attempts++
      }
      setAuthLoading(false)
    }
    waitForAuth()
  }, [])

  useEffect(() => {
    if (authLoading) return

    let active = true

    async function loadProfile() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/onboarding')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, current_push_level, pain_areas, has_pain, fitness_goal, height_cm, weight_kg')
        .eq('id', user.id)
        .single()

      if (!active) return
      if (error || !data) {
        router.replace('/onboarding')
        return
      }

      setProfile(data as Profile)
      setLoading(false)
    }

    loadProfile()
    return () => { active = false }
  }, [authLoading, router])

  if (authLoading || loading) {
    return (
      <main className="result-shell result-shell-loading">
        <div className="result-orb result-orb-top" />
        <div className="result-orb result-orb-bottom" />
        <section className="result-hero result-hero-loading">
          <div className="result-badge">Résultat personnalisé</div>
          <p className="result-muted">Préparation de ton résultat...</p>
        </section>
      </main>
    )
  }

  if (!profile) return null

  const adjustment = getProgramAdjustment(profile)
  const painMessage = profile.pain_areas?.length
    ? `Protocole ajusté pour préserver vos ${profile.pain_areas.join(', ')}.`
    : adjustment.volume === 'reduced'
      ? 'Le volume de départ sera progressif pour favoriser une adaptation confortable.'
      : 'Progression standard avec priorité à la qualité du mouvement.'

  const goalLabel = {
    force: 'Force',
    sante: 'Confort articulaire',
    posture: 'Posture',
  }[profile.fitness_goal || ''] || 'Personnalisé'

  return (
    <main className="result-shell">
      <div className="result-orb result-orb-top" />
      <div className="result-orb result-orb-bottom" />

      <section className="result-hero">
        <div className="result-badge">Résultat personnalisé</div>
        <p className="result-kicker">Analyse de ton profil et adaptation automatique du plan</p>
        <h1 className="result-title">
          Ton niveau de départ
          <span>{adjustment.title}</span>
        </h1>
        <p className="result-subtitle">{painMessage}</p>
      </section>

      <section className="result-panels">
        <article className="result-card result-score-card">
          <div className="result-score-ring">
            <div>
              <span className="result-score-label">Niveau</span>
              <strong>{adjustment.title}</strong>
            </div>
          </div>
          <div className="result-score-copy">
            <h2>Ta base de travail est prête.</h2>
            <p>
              On a calibré ton point de départ pour préserver tes articulations tout en gardant une progression réelle.
            </p>
          </div>
        </article>

        <article className="result-card result-grid-card">
          <div className="result-card-header">
            <span className="result-card-eyebrow">Lecture rapide</span>
            <h2 className="result-card-title">Ton profil en un coup d’œil</h2>
          </div>

          <div className="result-metrics">
            <Metric label="Objectif" value={goalLabel} />
            <Metric label="Fréquence" value={`${adjustment.frequency} séances`} />
            <Metric label="Cycle" value={`${adjustment.cycleWeeks} semaines`} />
          </div>

          <div className="result-note">
            <IconCheck />
            <p>Ton programme tient compte de tes données physiques pour ajuster progressivement le volume et les temps de repos.</p>
          </div>
        </article>

        <article className="result-card result-roadmap-card">
          <div className="result-card-header">
            <span className="result-card-eyebrow">7 prochains jours</span>
            <h2 className="result-card-title">Ce que tu dois faire maintenant</h2>
          </div>

          <div className="roadmap-list">
            <div className="roadmap-item">
              <span>1</span>
              <p>Commence par la séance du jour à ton niveau exact.</p>
            </div>
            <div className="roadmap-item">
              <span>2</span>
              <p>Garde la qualité du mouvement avant le volume.</p>
            </div>
            <div className="roadmap-item">
              <span>3</span>
              <p>Reviens ici après 7 jours pour voir le palier suivant.</p>
            </div>
          </div>
        </article>
      </section>

      <section className="result-cta-card">
        <div>
          <span className="result-card-eyebrow">Prochain pas</span>
          <h2>Prêt à lancer ton plan ?</h2>
          <p>Tu peux maintenant accéder à la méthode complète et suivre la progression adaptée à ton niveau.</p>
        </div>

        <div className="result-actions">
          <Link href="/program" className="result-btn result-btn-primary">Démarrer mon plan</Link>
          <Link href="/premium" className="result-btn result-btn-secondary">Voir le premium</Link>
        </div>
      </section>

      <style jsx>{`
        .result-shell {
          min-height: 100vh;
          padding: 20px 16px 40px;
          background:
            radial-gradient(circle at top, rgba(255, 255, 255, 0.35), transparent 35%),
            linear-gradient(180deg, #f6f7fb 0%, #edf1f7 100%);
          color: #0f172a;
          position: relative;
          overflow: hidden;
        }

        .result-shell-loading {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .result-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(50px);
          opacity: 0.55;
          pointer-events: none;
        }

        .result-orb-top {
          top: -120px;
          right: -80px;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.35), transparent 70%);
        }

        .result-orb-bottom {
          bottom: -140px;
          left: -100px;
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(15, 23, 42, 0.18), transparent 70%);
        }

        .result-hero,
        .result-panels,
        .result-cta-card {
          position: relative;
          z-index: 1;
          max-width: 820px;
          margin: 0 auto;
        }

        .result-hero {
          padding: 8px 4px 18px;
        }

        .result-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.06);
          color: #334155;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .result-kicker {
          margin: 0 0 12px;
          color: #64748b;
          font-size: 0.9rem;
          letter-spacing: 0.02em;
        }

        .result-title {
          margin: 0;
          display: grid;
          gap: 10px;
          font-size: clamp(2.4rem, 9vw, 5.2rem);
          line-height: 0.94;
          letter-spacing: -0.07em;
          font-weight: 900;
        }

        .result-title span {
          color: #111827;
          text-wrap: balance;
        }

        .result-subtitle {
          margin: 18px 0 0;
          font-size: 1.02rem;
          line-height: 1.65;
          color: #475569;
          max-width: 60ch;
        }

        .result-panels {
          display: grid;
          gap: 14px;
          margin-top: 14px;
        }

        .result-card,
        .result-cta-card {
          border: 1px solid rgba(15, 23, 42, 0.08);
          background: rgba(255, 255, 255, 0.68);
          backdrop-filter: blur(18px) saturate(130%);
          -webkit-backdrop-filter: blur(18px) saturate(130%);
          border-radius: 28px;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
        }

        .result-card {
          padding: 18px;
        }

        .result-score-card {
          display: grid;
          gap: 16px;
        }

        .result-score-ring {
          width: 100%;
          aspect-ratio: 1.55 / 1;
          border-radius: 24px;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.72) 55%, rgba(255, 255, 255, 0.38) 100%),
            linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(15, 23, 42, 0.08));
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .result-score-ring > div {
          text-align: center;
          display: grid;
          gap: 6px;
        }

        .result-score-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #64748b;
          font-weight: 800;
        }

        .result-score-ring strong {
          font-size: clamp(1.8rem, 6vw, 2.6rem);
          letter-spacing: -0.05em;
          line-height: 1;
        }

        .result-score-copy h2 {
          margin: 0;
          font-size: 1.3rem;
          letter-spacing: -0.04em;
        }

        .result-score-copy p {
          margin: 10px 0 0;
          color: #475569;
          line-height: 1.6;
        }

        .result-card-header {
          display: grid;
          gap: 8px;
          margin-bottom: 16px;
        }

        .result-card-eyebrow {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #64748b;
          font-weight: 800;
        }

        .result-card-title,
        .result-cta-card h2 {
          margin: 0;
          font-size: 1.35rem;
          letter-spacing: -0.04em;
        }

        .result-metrics {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .result-metric {
          padding: 16px;
          border-radius: 20px;
          background: linear-gradient(180deg, #fff 0%, #f8fafc 100%);
          border: 1px solid rgba(148, 163, 184, 0.16);
          display: grid;
          gap: 6px;
        }

        .result-metric span {
          color: #64748b;
          font-size: 0.84rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .result-metric strong {
          font-size: 1.05rem;
          color: #0f172a;
        }

        .result-note {
          margin-top: 16px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 16px;
          border-radius: 20px;
          background: rgba(15, 23, 42, 0.04);
        }

        .result-check {
          width: 24px;
          height: 24px;
          flex: 0 0 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #111827;
          color: white;
          font-size: 0.85rem;
          font-weight: 900;
          margin-top: 2px;
        }

        .result-note p,
        .result-muted,
        .result-cta-card p,
        .roadmap-item p {
          margin: 0;
          color: #475569;
          line-height: 1.65;
        }

        .roadmap-list {
          display: grid;
          gap: 12px;
        }

        .roadmap-item {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 12px;
          align-items: start;
          padding: 14px 0;
          border-top: 1px solid rgba(148, 163, 184, 0.18);
        }

        .roadmap-item:first-child {
          border-top: 0;
          padding-top: 0;
        }

        .roadmap-item span {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: #111827;
          color: #fff;
          font-weight: 800;
          box-shadow: 0 12px 24px rgba(17, 24, 39, 0.16);
        }

        .result-cta-card {
          margin-top: 14px;
          padding: 20px;
          display: grid;
          gap: 18px;
        }

        .result-actions {
          display: grid;
          gap: 12px;
        }

        .result-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 0 18px;
          border-radius: 16px;
          text-decoration: none;
          font-weight: 800;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .result-btn:active {
          transform: translateY(1px);
        }

        .result-btn-primary {
          background: #111827;
          color: white;
          box-shadow: 0 12px 24px rgba(17, 24, 39, 0.18);
        }

        .result-btn-secondary {
          background: white;
          color: #111827;
          border: 1px solid rgba(15, 23, 42, 0.14);
        }

        .result-hero-loading {
          max-width: 820px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .result-shell {
            padding: 36px 24px 56px;
          }

          .result-card,
          .result-cta-card {
            padding: 28px;
          }

          .result-score-card {
            grid-template-columns: minmax(250px, 320px) 1fr;
            align-items: center;
          }

          .result-metrics {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .result-actions {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </main>
  )
}
