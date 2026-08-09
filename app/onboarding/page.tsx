'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'
import { createClient } from '../../lib/supabase/client'

type Answers = {
  goal: string
  pains: string[]
  level: string
  email: string
  age: string
  height: string
  weight: string
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1.1rem',
  border: '1px solid var(--color-border)',
  borderRadius: '0.9rem',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontFamily: 'inherit',
  fontSize: '1.02rem',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.6rem',
  fontWeight: 600,
  color: 'var(--color-text)',
  letterSpacing: '-0.01em',
  fontSize: '0.98rem',
}

const helperStyle: React.CSSProperties = {
  marginTop: '0.35rem',
  fontSize: '0.9rem',
  color: 'var(--color-muted)',
}

const initialAnswers: Answers = { goal: '', pains: [], level: '', email: '', age: '', height: '', weight: '' }

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message
  if (typeof error === 'object' && error !== null) {
    const value = error as { message?: string; error_description?: string; error?: string }
    return value.message || value.error_description || value.error || 'Une erreur est survenue lors de l\'envoi du lien.'
  }
  return 'Une erreur est survenue lors de l\'envoi du lien.'
}

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>(initialAnswers)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false)
  const [cooldownRemaining, setCooldownRemaining] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    if (cooldownRemaining <= 0) return
    const timer = window.setInterval(() => setCooldownRemaining(value => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [cooldownRemaining])

  const handleSelect = (key: keyof Answers, value: string) => setAnswers(prev => ({ ...prev, [key]: value }))
  const nextStep = () => setStep(current => Math.min(current + 1, 4))

  const togglePain = (painId: string) => {
    setAnswers(prev => {
      if (painId === 'aucune') return { ...prev, pains: ['aucune'] }
      const withoutNone = prev.pains.filter(pain => pain !== 'aucune')
      const pains = withoutNone.includes(painId)
        ? withoutNone.filter(pain => pain !== painId)
        : [...withoutNone, painId]
      return { ...prev, pains }
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (isSubmitting || cooldownRemaining > 0) return
    setIsSubmitting(true)
    setError(null)
    try {
      window.localStorage.setItem('up40_pending_profile', JSON.stringify(answers))

      const res = await fetch('/api/create-profile-and-send-bilan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: answers.email.trim(),
          age: answers.age,
          height: answers.height,
          weight: answers.weight,
          goal: answers.goal,
          pains: answers.pains,
          level: answers.level,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la création du profil')
      }

      setCooldownRemaining(60)
      setIsMagicLinkSent(true)
    } catch (err: unknown) {
      console.error('Magic link error:', err)
      const message = err instanceof Error ? err.message : 'Une erreur est survenue'
      const normalized = message.toLowerCase()
      if (normalized.includes('rate limit') || normalized.includes('email rate')) {
        setCooldownRemaining(60)
        setError('Trop de demandes en peu de temps. Attendez 60 secondes avant de réessayer.')
      } else if (normalized.includes('smtp') || normalized.includes('email provider') || normalized.includes('sender')) {
        setError('L\'envoi de l\'email a échoué. Vérifiez la configuration SMTP et l\'adresse expéditeur dans Supabase.')
      } else {
        setError(message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isMagicLinkSent) return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="badge-new mb-6">Bilan enregistré</div>
      <h1 className="display-title mb-6" style={{ fontSize: 'var(--text-xl)' }}>Vérifiez votre boîte email</h1>
      <p className="hero-description max-w-md mx-auto mb-6" style={{ fontSize: '1rem' }}>
        Un lien de connexion a été envoyé à <strong>{answers.email}</strong>.
      </p>
      <p className="hero-description max-w-md mx-auto mb-10" style={{ fontSize: '1rem' }}>
        Cliquez sur ce lien pour accéder à votre résultat et à votre plan de départ Up40.
      </p>
      <Link href="/" className="btn-dark">Retour à l’accueil</Link>
    </main>
  )

  return (
    <main className="min-h-screen bg-white">
      <header className="top-header transparent">
        <div className="nav-container">
          <nav className="nav-bar">
            <Link href="/" className="logo-minimal">Up40.</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link href="/" className="nav-link">Annuler</Link>
              {/* Theme toggle conservé mais moins mis en avant */}
              <div style={{ opacity: 0.75 }}>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section
        className="hero-section photo-hero text-center"
        style={{ minHeight: 'auto', paddingBottom: '2rem' }}
      >
        <div className="badge-new mx-auto">Bilan personnalisé</div>
        <h1
          className="display-title mt-2"
          style={{ fontSize: 'var(--text-xl)' }}
        >
          Votre profil
        </h1>
        <p
          className="hero-description mb-4"
          style={{ fontSize: '1rem', maxWidth: '42ch', margin: '0 auto' }}
        >
          Ce bilan nous permet de fixer un point de départ raisonnable. Quelques questions, aucune performance à « prouver », simplement une image honnête de votre situation actuelle.
        </p>
      </section>

      <div className="onboarding-container" style={{ paddingTop: 0, maxWidth: 640, margin: '0 auto' }}>
        <div className="progress-bar" style={{ marginBottom: '3rem' }}>
          <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }} />
        </div>

        {step === 1 && (
          <div className="step-content">
            <h1
              className="display-title"
              style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}
            >
              Quel est votre objectif principal ?
            </h1>
            <p
              className="hero-description mb-8"
              style={{ fontSize: '1rem', maxWidth: '42ch' }}
            >
              Up40 s’adapte à votre priorité du moment. Il ne s’agit pas de choisir « le bon » objectif, mais de préciser ce qui compte le plus pour vous maintenant.
            </p>
            <div className="options-grid">
              {[
                ['force', 'Gagner en force', 'Retrouver des pompes complètes et un haut du corps solide.'],
                ['sante', 'Confort articulaire', 'Pratiquer sans ressentir de gêne régulière aux épaules ou aux poignets.'],
                ['posture', 'Améliorer ma posture', 'Ouvrir le torse, tenir mieux, et sentir le haut du corps plus présent.'],
              ].map(([id, title, description]) => (
                <button
                  key={id}
                  type="button"
                  className={`task-card ${answers.goal === id ? 'active' : ''}`}
                  onClick={() => {
                    handleSelect('goal', id)
                    setTimeout(nextStep, 300)
                  }}
                >
                  <div className="task-details">
                    <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{title}</h4>
                    <p style={{ margin: 0, marginTop: '4px', fontSize: '0.95rem' }}>{description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h1
              className="display-title"
              style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}
            >
              Ressentez-vous des gênes fréquentes ?
            </h1>
            <p
              className="hero-description mb-8"
              style={{ fontSize: '1rem', maxWidth: '42ch' }}
            >
              Indiquez les zones sensibles. Le programme ne les « évite » pas complètement, mais il les prend en compte pour ajuster la charge et le placement.
            </p>
            <div className="options-grid mb-8">
              {[
                ['epaules', 'Épaules'],
                ['poignets', 'Poignets'],
                ['coudes', 'Coudes'],
                ['dos', 'Bas du dos'],
                ['aucune', 'Aucune gêne particulière'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={`task-card ${answers.pains.includes(id) ? 'active' : ''}`}
                  onClick={() => togglePain(id)}
                >
                  <div className="task-details">
                    <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{label}</h4>
                  </div>
                </button>
              ))}
            </div>
            <button
              className="btn-dark"
              style={{ width: '100%', padding: '1.25rem', fontSize: '1.02rem' }}
              onClick={nextStep}
              disabled={answers.pains.length === 0}
            >
              Continuer
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h1
              className="display-title"
              style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}
            >
              Combien de pompes propres faites-vous aujourd’hui ?
            </h1>
            <p
              className="hero-description mb-8"
              style={{ fontSize: '1rem', maxWidth: '42ch' }}
            >
              On parle de pompes complètes, buste qui se rapproche du sol, corps bien aligné. Une estimation honnête vaut mieux qu’un chiffre parfait.
            </p>
            <div className="options-grid">
              {[
                ['0', '0 vraie pompe'],
                ['1-5', 'Entre 1 et 5 pompes'],
                ['5-15', 'Entre 5 et 15 pompes'],
                ['15+', 'Plus de 15 pompes'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={`task-card ${answers.level === id ? 'active' : ''}`}
                  onClick={() => {
                    handleSelect('level', id)
                    setTimeout(nextStep, 300)
                  }}
                >
                  <div className="task-details">
                    <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{label}</h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content">
            <h1
              className="display-title"
              style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}
            >
              Dernière étape pour voir votre résultat
            </h1>
            <p
              className="hero-description mb-8"
              style={{ fontSize: '1rem', maxWidth: '42ch' }}
            >
              Nous créons votre profil Up40. L’email sert uniquement à vous envoyer le lien de connexion sécurisé vers votre résultat et votre plan de départ.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col text-left"
              style={{ gap: '1.5rem' }}
            >
              <div>
                <label style={labelStyle}>Votre e-mail</label>
                <input
                  type="email"
                  required
                  style={inputStyle}
                  placeholder="email@exemple.com"
                  value={answers.email}
                  onChange={event => handleSelect('email', event.target.value)}
                />
                <p style={helperStyle}>Nous n’utilisons pas cette adresse pour vous envoyer des contenus promotionnels.</p>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: '1rem',
                }}
              >
                {[
                  ['age', 'Âge', 'Ans'],
                  ['height', 'Taille', 'cm'],
                  ['weight', 'Poids', 'kg'],
                ].map(([key, label, placeholder]) => (
                  <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <input
                      type="number"
                      required
                      min={key === 'age' ? 35 : key === 'height' ? 140 : 40}
                      max={key === 'age' ? 75 : key === 'height' ? 220 : 200}
                      step={key === 'weight' ? '0.1' : '1'}
                      style={inputStyle}
                      placeholder={placeholder}
                      value={answers[key as keyof Answers] as string}
                      onChange={event => handleSelect(key as keyof Answers, event.target.value)}
                    />
                  </div>
                ))}
              </div>
              {error && (
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: '#fef2f2',
                    color: '#dc2626',
                    borderRadius: '0.75rem',
                    fontSize: '0.95rem',
                  }}
                >
                  {error}
                  {cooldownRemaining > 0 && (
                    <div style={{ marginTop: '0.5rem' }}>
                      Nouvel essai possible dans {cooldownRemaining} s.
                    </div>
                  )}
                </div>
              )}
              <button
                type="submit"
                className="btn-dark"
                style={{
                  width: '100%',
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '1.25rem',
                  fontSize: '1.05rem',
                }}
                disabled={
                  isSubmitting ||
                  cooldownRemaining > 0 ||
                  !answers.email ||
                  !answers.age ||
                  !answers.weight ||
                  !answers.height
                }
              >
                {isSubmitting
                  ? 'Envoi en cours…'
                  : cooldownRemaining > 0
                  ? `Réessayez dans ${cooldownRemaining} s`
                  : 'Recevoir mon lien de connexion'}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}
