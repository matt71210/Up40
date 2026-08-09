'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'
import { getProgramAdjustment, type ProfileInput } from '../../lib/program'

type Profile = ProfileInput & {
  id?: string
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
      <main className="min-h-screen bg-white">
        <section className="hero-section photo-hero" style={{ minHeight: 'auto' }}>
          <div className="hero-content">
            <div className="badge-new">Résultat personnalisé</div>
            <h1 className="display-title" style={{ fontSize: 'var(--text-xl)' }}>Préparation de ton résultat…</h1>
            <p className="hero-description muted">On crée ton plan sur mesure, à partir des données de ton bilan.</p>
          </div>
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

  return (
    <main className="min-h-screen bg-white">
      <header className="top-header transparent">
        <div className="nav-container">
          <nav className="nav-bar">
            <Link href="/" className="logo-minimal">Up40.</Link>
            <div className="nav-actions" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="nav-links">
                <Link href="/program" className="nav-link">La méthode</Link>
                <Link href="/premium" className="nav-btn">Premium</Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero-section photo-hero" style={{ minHeight: 'auto', paddingBottom: '2rem' }}>
        <div className="hero-content">
          <div className="badge-new">Résultat personnalisé</div>
          <h1 className="display-title" style={{ fontSize: 'var(--text-xl)', maxWidth: '18ch' }}>
            Ton niveau de départ : {adjustment.title}
          </h1>
          <p className="hero-description" style={{ maxWidth: '40ch' }}>{painMessage}</p>

          <div className="trust-metrics" style={{ marginTop: '1.5rem' }}>
            <div className="metric">
              <span className="metric-val">{adjustment.frequency}x</span>
              <span className="metric-lbl">Par semaine</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric">
              <span className="metric-val">{adjustment.cycleWeeks}</span>
              <span className="metric-lbl">Semaines de cycle</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Poids du corps</span>
            </div>
          </div>
        </div>
      </section>

      <section className="value-section">
        <div className="value-grid">
          <div className="value-box">
            <h3>Point de départ sécurisé</h3>
            <p>Le volume est ajusté pour te permettre de reconstruire ta force sans brusquer tes articulations.</p>
          </div>
          <div className="value-box">
            <h3>Progression réaliste</h3>
            <p>Les paliers de difficulté suivent ton niveau actuel pour éviter les à-coups et les blessures.</p>
          </div>
          <div className="value-box">
            <h3>Routine minimaliste</h3>
            <p>Des séances courtes, concentrées, qui s’intègrent facilement dans un planning chargé.</p>
          </div>
        </div>
      </section>

      <section className="value-section" style={{ paddingTop: 0 }}>
        <div className="value-grid">
          <div className="value-box" style={{ gridColumn: 'span 2' }}>
            <h3>Les 7 prochains jours</h3>
            <p>Commence par la séance du jour à ton niveau exact, et privilégie toujours la qualité du mouvement avant le nombre de répétitions.</p>
          </div>
          <div className="value-box">
            <h3>Et après ?</h3>
            <p>Reviens sur cette page après une semaine : ton plan s’adaptera automatiquement à tes progrès.</p>
          </div>
        </div>
      </section>

      <div className="footer-spacing"></div>

      <nav className="bottom-nav">
        <Link href="/" className="nav-item">Accueil</Link>
        <Link href="/onboarding" className="nav-item">Bilan</Link>
        <Link href="/program" className="nav-item active">Plan</Link>
        <Link href="/progress" className="nav-item">Progrès</Link>
        <Link href="/premium" className="nav-item">Premium</Link>
      </nav>
    </main>
  )
}
