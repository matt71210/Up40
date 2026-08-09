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
            <p className="hero-description muted">On crée ton plan de départ à partir des données de ton bilan.</p>
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
                <Link href="/program" className="nav-link">Méthode</Link>
                <Link href="/premium" className="nav-btn">Premium</Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero-section photo-hero" style={{ minHeight: 'auto', paddingBottom: '2rem' }}>
        <div className="hero-content">
          <div className="badge-new">Résultat personnalisé</div>
          <p className="hero-description" style={{ fontSize: 'var(--text-base)', marginBottom: '0.75rem' }}>
            Ton plan de départ est prêt.
          </p>
          <h1 className="display-title" style={{ fontSize: 'var(--text-xl)', maxWidth: '22ch' }}>
            Ton plan de départ : {adjustment.title}
          </h1>
          <p className="hero-description" style={{ maxWidth: '44ch' }}>{painMessage}</p>

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
            <h3>Ce que ce résultat signifie</h3>
            <p>Ce niveau de départ n’est pas un jugement. C’est un point de repère. Il permet de choisir des séances qui respectent tes contraintes actuelles, tout en te donnant une marge de progression claire.</p>
          </div>
          <div className="value-box">
            <h3>Ce que le plan protège</h3>
            <p>Les séances sont calibrées pour limiter les contraintes sur les zones sensibles que tu as indiquées (épaules, poignets, coudes, bas du dos). L’idée n’est pas de tout éviter, mais de construire une tolérance solide au fil des semaines.</p>
          </div>
          <div className="value-box">
            <h3>Ce que le plan demande</h3>
            <p>Trois séances courtes par semaine, honnêtes avec toi-même. Pas de perfection, juste une régularité suffisante pour que le corps ait le temps de s’adapter.</p>
          </div>
        </div>
      </section>

      <section className="value-section" style={{ paddingTop: 0 }}>
        <div className="value-grid">
          <div className="value-box" style={{ gridColumn: 'span 2' }}>
            <h3>Cette semaine</h3>
            <p>Commence par la séance du jour à ton niveau exact. Ne cherche pas à « prouver » quelque chose. Cherche la qualité : trajectoire, respiration, contrôle. C’est cette qualité qui rend les séances utiles à long terme.</p>
          </div>
          <div className="value-box">
            <h3>Et ensuite</h3>
            <p>Reviens sur cette page après une semaine : ton plan s’adaptera automatiquement à tes progrès et t’indiquera le palier suivant.</p>
          </div>
        </div>
      </section>

      <section className="value-section" style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="value-grid">
          <div className="value-box" style={{ gridColumn: 'span 3' }}>
            <h3>Passer à la suite</h3>
            <p>La page Méthode te montre comment sont construits tes cycles, tes séances et tes paliers de progression. Tu peux aussi découvrir l’option Premium si tu veux un accompagnement plus structuré.</p>
            <div className="row" style={{ marginTop: 18 }}>
              <Link href="/program" className="btn-dark">Voir la méthode</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-spacing" style={{ height: 'calc(70px + env(safe-area-inset-bottom))' }}></div>

      <nav className="bottom-nav" style={{ paddingBottom: 'calc(6px + env(safe-area-inset-bottom))', minHeight: '60px' }}>
        <Link href="/" className="nav-item">Accueil</Link>
        <Link href="/onboarding" className="nav-item">Bilan</Link>
        <Link href="/program" className="nav-item">Méthode</Link>
        <Link href="/progress" className="nav-item">Progrès</Link>
        <Link href="/premium" className="nav-item">Premium</Link>
      </nav>
    </main>
  )
}
