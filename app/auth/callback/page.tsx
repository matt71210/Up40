'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'

type PendingProfile = {
  goal: string
  pains: string[]
  level: string
  email: string
  age: string
  height: string
  weight: string
}

export default function AuthCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    let cancelled = false

    async function completeSignIn() {
      const code = new URLSearchParams(window.location.search).get('code')

      if (!code) {
        setError('Le lien de connexion est incomplet ou a déjà été utilisé.')
        return
      }

      const { error: authError } = await supabase.auth.exchangeCodeForSession(code)
      if (authError) {
        setError('Le lien de connexion est invalide ou a expiré.')
        return
      }

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      const user = sessionData.session?.user
      if (sessionError || !user) {
        setError('Impossible de récupérer votre session.')
        return
      }

      const rawProfile = window.localStorage.getItem('up40_pending_profile')
      if (rawProfile) {
        try {
          const pending = JSON.parse(rawProfile) as PendingProfile
          const currentPushLevel = pending.level === '0' ? 0 : pending.level === '1-5' ? 1 : pending.level === '5-15' ? 2 : 3
          const profile = {
            id: user.id,
            email: user.email ?? pending.email,
            age: Number.parseInt(pending.age, 10),
            height_cm: Number.parseInt(pending.height, 10),
            weight_kg: Number.parseFloat(pending.weight),
            current_push_level: currentPushLevel,
            has_pain: pending.pains.length > 0 && !pending.pains.includes('aucune'),
            pain_areas: pending.pains,
            fitness_goal: pending.goal,
          }

          const { error: profileError } = await supabase
            .from('profiles')
            .upsert(profile, { onConflict: 'id' })

          if (profileError) {
            setError('Votre connexion est valide, mais votre profil n’a pas pu être enregistré.')
            return
          }

          window.localStorage.setItem('up40_profile', JSON.stringify(profile))
          window.localStorage.removeItem('up40_pending_profile')
        } catch {
          setError('Les données du diagnostic sont invalides. Veuillez recommencer.')
          return
        }
      }

      if (!cancelled) router.replace('/result')
    }

    completeSignIn()
    return () => { cancelled = true }
  }, [router, supabase])

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      {error ? (
        <>
          <div className="badge-new mb-6">Connexion impossible</div>
          <h1 className="display-title mb-6">Le lien n’a pas fonctionné</h1>
          <p className="hero-description max-w-md mx-auto mb-10">{error}</p>
          <a href="/onboarding" className="btn-dark">Recommencer</a>
        </>
      ) : (
        <>
          <div className="badge-new mb-6">Connexion en cours</div>
          <h1 className="display-title mb-6">Nous préparons votre programme</h1>
          <p className="hero-description max-w-md mx-auto">Veuillez patienter quelques secondes.</p>
        </>
      )}
    </main>
  )
}