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
      <main className="result-shell">
        <div className="result-card result-card-loading">
          <div className="result-badge">Résultat personnalisé</div>
          <p className="result-muted">Préparation de ton résultat...</p>
        </div>
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
      <section className="result-hero">
        <div className="result-badge">Résultat personnalisé</div>
        <h1 className="result-title">
          Ton niveau de départ :
          <span>{adjustment.title}</span>
        </h1>
        <p className="result-subtitle">{painMessage}</p>
      </section>

      <section className="result-grid">
        <article className="result-card result-summary-card">
          <div className="result-card-header">
            <span className="result-card-eyebrow">Lecture rapide</span>
            <h2 className="result-card-title">Ton profil en un coup d’œil</h2>
          </div>

          <div className="result-kpi-grid">
            <div className="result-kpi">
              <span>Objectif</span>
              <strong>{goalLabel}</strong>
            </div>
            <div className="result-kpi">
              <span>Fréquence</span>
              <strong>{adjustment.frequency} séances</strong>
            </div>
            <div className="result-kpi">
              <span>Cycle</span>
              <strong>{adjustment.cycleWeeks} semaines</strong>
            </div>
          </div>

          <div className="result-note">
            <IconCheck />
            <p>
              Ton programme tient compte de tes données physiques pour ajuster progressivement le volume et les temps de repos.
            </p>
          </div>
        </article>

        <article className="result-card result-plan-card">
          <div className="result-card-header">
            <span className="result-card-eyebrow">Prochain pas</span>
            <h2 className="result-card-title">Démarre ton plan</h2>
          </div>

          <p className="result-muted">
            Tu peux maintenant accéder à la méthode complète et suivre la progression adaptée à ton niveau.
          </p>

          <div className="result-actions">
            <Link href="/program" className="result-btn result-btn-primary">Démarrer mon plan</Link>
            <Link href="/premium" className="result-btn result-btn-secondary">Voir le premium</Link>
          </div>
        </article>
      </section>

      <style jsx>{`
        .result-shell {
          min-height: 100vh;
          padding: 24px 16px 40px;
          background:
            radial-gradient(circle at top, rgba(17, 24, 39, 0.08), transparent 40%),
            linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
          color: #0f172a;
        }

        .result-hero {
          max-width: 760px;
          margin: 0 auto 24px;
          padding: 8px 4px;
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
          margin-bottom: 16px;
        }

        .result-title {
          margin: 0;
          font-size: clamp(2rem, 7vw, 4.5rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
          font-weight: 800;
          display: grid;
          gap: 8px;
        }

        .result-title span {
          display: inline-block;
          color: #111827;
        }

        .result-subtitle {
          margin: 16px 0 0;
          font-size: 1.05rem;
          line-height: 1.6;
          color: #475569;
          max-width: 60ch;
        }

        .result-grid {
          max-width: 760px;
          margin: 0 auto;
          display: grid;
          gap: 16px;
        }

        .result-card {
          border: 1px solid rgba(15, 23, 42, 0.08);
          background: rgba(255, 255, 255, 0.86);
          backdrop-filter: blur(16px);
          border-radius: 28px;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
          padding: 20px;
        }

        .result-card-header {
          display: grid;
          gap: 8px;
          margin-bottom: 18px;
        }

        .result-card-eyebrow {
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #64748b;
          font-weight: 700;
        }

        .result-card-title {
          margin: 0;
          font-size: 1.4rem;
          letter-spacing: -0.03em;
        }

        .result-kpi-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .result-kpi {
          padding: 16px;
          border-radius: 20px;
          background: #f8fafc;
          border: 1px solid rgba(148, 163, 184, 0.18);
          display: grid;
          gap: 6px;
        }

        .result-kpi span {
          color: #64748b;
          font-size: 0.86rem;
        }

        .result-kpi strong {
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
          font-weight: 800;
          margin-top: 2px;
        }

        .result-note p,
        .result-muted {
          margin: 0;
          color: #475569;
          line-height: 1.6;
        }

        .result-plan-card {
          display: grid;
          gap: 16px;
        }

        .result-actions {
          display: grid;
          gap: 12px;
        }

        .result-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          padding: 0 18px;
          border-radius: 16px;
          text-decoration: none;
          font-weight: 700;
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

        .result-card-loading {
          max-width: 760px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .result-shell {
            padding: 40px 24px 56px;
          }

          .result-card {
            padding: 28px;
          }

          .result-kpi-grid {
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
