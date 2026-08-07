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
  width: '100%', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.9rem',
  backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', fontFamily: 'inherit', fontSize: '1rem', outline: 'none'
}

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: '0.6rem', fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.01em'
}

const initialAnswers: Answers = { goal: '', pains: [], level: '', email: '', age: '', height: '', weight: '' }

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
      const pains = withoutNone.includes(painId) ? withoutNone.filter(pain => pain !== painId) : [...withoutNone, painId]
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
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: answers.email.trim(),
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
      })
      if (authError) throw authError
      setCooldownRemaining(60)
      setIsMagicLinkSent(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : ''
      if (message.toLowerCase().includes('rate limit') || message.toLowerCase().includes('email rate')) {
        setCooldownRemaining(60)
        setError('Trop de demandes en peu de temps. Attendez 60 secondes avant de réessayer.')
      } else {
        setError(message || 'Une erreur est survenue lors de l’envoi du lien.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isMagicLinkSent) return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="badge-new mb-6">Email envoyé</div>
      <h1 className="display-title mb-6">Vérifiez votre boîte email</h1>
      <p className="hero-description max-w-md mx-auto mb-6">Un lien de connexion a été envoyé à <strong>{answers.email}</strong>.</p>
      <p className="hero-description max-w-md mx-auto mb-10">Cliquez sur ce lien pour terminer votre inscription et découvrir votre programme personnalisé.</p>
      <Link href="/" className="btn-dark">Retour à l’accueil</Link>
    </main>
  )

  return (
    <main className="min-h-screen bg-white">
      <header className="top-header transparent"><div className="nav-container"><nav className="nav-bar"><Link href="/" className="logo-minimal">Up40.</Link><div style={{ display: 'flex', alignItems: 'center' }}><Link href="/" className="nav-link">Annuler</Link><ThemeToggle /></div></nav></div></header>
      <section className="hero-section photo-hero text-center" style={{ minHeight: 'auto', paddingBottom: '2rem' }}><div className="badge-new mx-auto">Bilan Personnalisé</div><h1 className="display-title mt-2" style={{ fontSize: 'var(--text-xl)' }}>Votre Profil</h1></section>
      <div className="onboarding-container" style={{ paddingTop: 0 }}>
        <div className="progress-bar" style={{ marginBottom: '3rem' }}><div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }} /></div>
        {step === 1 && <div className="step-content"><h1 className="display-title" style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}>Quel est votre objectif principal ?</h1><p className="hero-description mb-8" style={{ fontSize: 'var(--text-base)' }}>Up40 s’adapte à votre priorité du moment.</p><div className="options-grid">{[['force','💪','Gagner en force','Retrouver de vraies pompes complètes.'],['sante','🛡️','Confort articulaire','Pratiquer sans subir de gênes aux articulations.'],['posture','🧍','Améliorer ma posture','Ouvrir le torse et renforcer le haut du corps.']].map(([id, icon, title, description]) => <button key={id} type="button" className={`task-card ${answers.goal === id ? 'active' : ''}`} onClick={() => { handleSelect('goal', id); setTimeout(nextStep, 300) }}><div className="task-icon">{icon}</div><div className="task-details"><h4 style={{ margin: 0, fontSize: '1.1rem' }}>{title}</h4><p style={{ margin: 0, marginTop: '4px' }}>{description}</p></div></button>)}</div></div>}
        {step === 2 && <div className="step-content"><h1 className="display-title" style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}>Ressentez-vous des gênes fréquentes ?</h1><p className="hero-description mb-8" style={{ fontSize: 'var(--text-base)' }}>Sélectionnez toutes les zones sensibles. Le programme s’adaptera.</p><div className="options-grid mb-8">{[['epaules','Oui, aux épaules'],['poignets','Oui, aux poignets'],['coudes','Oui, aux coudes'],['dos','Oui, au bas du dos'],['aucune','Aucune gêne']].map(([id, label]) => <button key={id} type="button" className={`task-card ${answers.pains.includes(id) ? 'active' : ''}`} onClick={() => togglePain(id)}><div className="task-details"><h4 style={{ margin: 0, fontSize: '1.1rem' }}>{label}</h4></div></button>)}</div><button className="btn-dark" style={{ width: '100%', padding: '1.25rem' }} onClick={nextStep} disabled={answers.pains.length === 0}>Continuer</button></div>}
        {step === 3 && <div className="step-content"><h1 className="display-title" style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}>Combien de pompes propres faites-vous aujourd’hui ?</h1><p className="hero-description mb-8" style={{ fontSize: 'var(--text-base)' }}>Buste qui touche presque le sol, corps bien droit.</p><div className="options-grid">{[['0','0 vraie pompe'],['1-5','Entre 1 et 5 pompes'],['5-15','Entre 5 et 15 pompes'],['15+','Plus de 15 pompes']].map(([id, label]) => <button key={id} type="button" className={`task-card ${answers.level === id ? 'active' : ''}`} onClick={() => { handleSelect('level', id); setTimeout(nextStep, 300) }}><div className="task-details"><h4 style={{ margin: 0, fontSize: '1.1rem' }}>{label}</h4></div></button>)}</div></div>}
        {step === 4 && <div className="step-content"><h1 className="display-title" style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}>Dernière étape pour voir votre résultat</h1><p className="hero-description mb-8" style={{ fontSize: 'var(--text-base)' }}>Nous créons votre profil personnalisé.</p><form onSubmit={handleSubmit} className="flex flex-col text-left" style={{ gap: '1.5rem' }}><div><label style={labelStyle}>Votre E-mail</label><input type="email" required style={inputStyle} placeholder="email@exemple.com" value={answers.email} onChange={event => handleSelect('email', event.target.value)} /></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>{[['age','Âge','Ans'],['height','Taille','cm'],['weight','Poids','kg']].map(([key, label, placeholder]) => <div key={key}><label style={labelStyle}>{label}</label><input type="number" required min={key === 'age' ? 18 : key === 'height' ? 140 : 40} max={key === 'age' ? 100 : key === 'height' ? 220 : 200} step={key === 'weight' ? '0.1' : '1'} style={inputStyle} placeholder={placeholder} value={answers[key as keyof Answers] as string} onChange={event => handleSelect(key as keyof Answers, event.target.value)} /></div>)}</div>{error && <div style={{ padding: '1rem', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '0.75rem', fontSize: '0.9rem' }}>{error}{cooldownRemaining > 0 && <div style={{ marginTop: '0.5rem' }}>Nouvel essai possible dans {cooldownRemaining} s.</div>}</div>}<button type="submit" className="btn-dark" style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.25rem', fontSize: '1.1rem' }} disabled={isSubmitting || cooldownRemaining > 0 || !answers.email || !answers.age || !answers.weight || !answers.height}>{isSubmitting ? 'Envoi en cours...' : cooldownRemaining > 0 ? `Réessayez dans ${cooldownRemaining} s` : 'Recevoir mon lien de connexion'}</button></form></div>}
      </div>
    </main>
  )
}