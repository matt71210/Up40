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
    let active = true

    async function waitForAuth() {
      const supabase = createClient()
      
      // Attendre que la session soit etablie (max 5 secondes)
      let attempts = 0
      while (attempts < 50) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          break
        }
        await new Promise(resolve => setTimeout(resolve, 100))
        attempts++
      }
      
      setAuthLoading(false)
    }

    waitForAuth()
    return () => { active = false }
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
    return <main className="card"><p className="lead muted">Preparation de ton resultat...</p></main>
  }

  if (!profile) return null

  const adjustment = getProgramAdjustment(profile)
  const painMessage = profile.pain_areas?.length
    ? `Protocole ajuste pour preserver vos ${profile.pain_areas.join(', ')}.`
    : adjustment.volume === 'reduced'
      ? 'Le volume de depart sera progressif pour favoriser une adaptation confortable.'
      : 'Progression standard avec priorite a la qualite du mouvement.'

  return (
    <main className="card">
      <div className="badge">Resultat personnalise</div>
      <h1 className="h1" style={{ fontSize: 'clamp(2rem,4vw,3.6rem)', maxWidth: '16ch' }}>
        Ton niveau de depart : {adjustment.title}
      </h1>
      <p className="lead muted">{painMessage}</p>

      <div className="kpis">
        <div className="kpi"><span className="muted">Objectif</span><strong>{adjustment.goal}</strong></div>
        <div className="kpi"><span className="muted">Frequence</span><strong>{adjustment.frequency} seances</strong></div>
        <div className="kpi"><span className="muted">Cycle</span><strong>{adjustment.cycleWeeks} semaines</strong></div>
      </div>

      {adjustment.bmi !== null && (
        <p className="muted" style={{ marginTop: 18, fontSize: '0.9rem' }}>
          Ton programme tient compte de tes donnees physiques pour ajuster progressivement le volume et les temps de repos.
        </p>
      )}

      <div className="row" style={{ marginTop: 22 }}>
        <Link href="/program" className="btn btn-primary">Demarrer mon plan</Link>
        <Link href="/premium" className="btn btn-secondary">Voir le premium</Link>
      </div>
    </main>
  )
}
