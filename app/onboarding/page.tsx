"use client"

import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1rem 1rem',
  border: '1px solid var(--color-border)',
  borderRadius: '0.9rem',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  fontFamily: 'inherit',
  fontSize: '1rem',
  outline: 'none',
  boxShadow: '0 1px 2px rgba(0,0,0,0.02) inset'
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.6rem',
  fontWeight: 600,
  color: 'var(--color-text)',
  letterSpacing: '-0.01em'
}

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<{ goal: string, pains: string[], level: string, email: string, age: string, height: string, weight: string }>({ goal: '', pains: [], level: '', email: '', age: '', height: '', weight: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSelect = (key: string, value: string) => setAnswers(prev => ({ ...prev, [key]: value }))

  const togglePain = (painId: string) => {
    setAnswers(prev => {
      if (painId === 'aucune') return { ...prev, pains: ['aucune'] }
      let newPains = prev.pains.filter(p => p !== 'aucune')
      if (newPains.includes(painId)) newPains = newPains.filter(p => p !== painId)
      else newPains = [...newPains, painId]
      return { ...prev, pains: newPains }
    })
  }

  const nextStep = () => setStep(s => s + 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      const { error: authError } = await supabase.auth.signUp({
        email: answers.email,
        password: 'User_Temp_Password_123!',
        options: { data: {
          age: parseInt(answers.age), height_cm: parseInt(answers.height), weight_kg: parseFloat(answers.weight), fitness_goal: answers.goal,
          has_pain: answers.pains.length > 0 && !answers.pains.includes('aucune'), pain_areas: answers.pains,
          current_push_level: answers.level === '0' ? 0 : answers.level === '1-5' ? 1 : answers.level === '5-15' ? 2 : 3
        }}
      })
      if (authError) throw authError
      setIsSuccess(true)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Une erreur est survenue lors de l'enregistrement.")
    } finally { setIsSubmitting(false) }
  }

  let recommendedLevel = 'Incliné 1'
  let recommendedDesc = "Départ stable avec travail d'appuis et contrôle."
  const hasPains = answers.pains.length > 0 && !answers.pains.includes('aucune')
  if (answers.level === '0') { recommendedLevel = 'Appui Mur'; recommendedDesc = "L'étape parfaite pour reconnecter le cerveau et les pecs sans aucun stress articulaire." }
  else if (answers.level === '1-5') { recommendedLevel = hasPains ? 'Incliné 1 (Contrôle Articulaire)' : 'Incliné 1 (Banc/Chaise)'; recommendedDesc = hasPains ? 'On adapte la charge en incliné pour effacer les inconforts tout en construisant une base solide.' : 'Idéal pour construire du volume propre sans dégrader la posture.' }
  else if (answers.level === '5-15') { recommendedLevel = hasPains ? 'Excentrique Lente' : 'Pompe Stricte (Séries courtes)'; recommendedDesc = hasPains ? 'Vous avez la force. On va utiliser le travail excentrique pour ménager vos articulations et consolider le mouvement.' : "On consolide votre niveau avec un focus sur la qualité d'exécution plutôt que sur la fatigue." }
  else if (answers.level === '15+') { recommendedLevel = hasPains ? 'Décharge partielle & Iso' : 'Pompe Stricte Tempo'; recommendedDesc = hasPains ? 'Niveau avancé, mais le corps envoie des signaux. On va renforcer vos tendons sans surcharger les articulations.' : 'Optimisation de la biomécanique pour préserver vos acquis après 40 ans.' }

  if (isSuccess) return <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center"><div className="badge-new mb-6">Bilan Terminé</div><h1 className="display-title mb-6">Votre niveau recommandé :<br/><span style={{ color: 'var(--color-primary)' }}>{recommendedLevel}</span></h1><p className="hero-description max-w-md mx-auto mb-10">{recommendedDesc}</p><p className="hero-description mb-10">Votre profil a bien été sauvegardé !</p><Link href="/" className="btn-dark">Retour à l'accueil</Link></main>

  return (
    <main className="min-h-screen bg-white">
      <header className="top-header transparent"><div className="nav-container"><nav className="nav-bar"><Link href="/" className="logo-minimal">Up40.</Link><div style={{ display: 'flex', alignItems: 'center' }}><Link href="/" className="nav-link">Annuler</Link><ThemeToggle /></div></nav></div></header>
      <section className="hero-section photo-hero text-center" style={{ minHeight: 'auto', paddingBottom: '2rem' }}><div className="badge-new mx-auto">Bilan Personnalisé</div><h1 className="display-title mt-2" style={{ fontSize: 'var(--text-xl)' }}>Votre Profil</h1></section>
      <div className="onboarding-container" style={{ paddingTop: 0 }}>
        <div className="progress-bar" style={{ marginBottom: '3rem' }}><div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div></div>
        {step === 1 && <div className="step-content"><h1 className="display-title" style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}>Quel est votre objectif principal ?</h1><p className="hero-description mb-8" style={{ fontSize: 'var(--text-base)' }}>Up40 s'adapte à votre priorité du moment.</p><div className="options-grid"><div className={`task-card ${answers.goal === 'force' ? 'active' : ''}`} onClick={() => { handleSelect('goal', 'force'); setTimeout(nextStep, 300) }} style={{ cursor: 'pointer' }}><div className="task-icon">💪</div><div className="task-details"><h4 style={{ margin: 0, fontSize: '1.1rem' }}>Gagner en force</h4><p style={{ margin: 0, marginTop: '4px' }}>Retrouver de vraies pompes complètes.</p></div></div><div className={`task-card ${answers.goal === 'sante' ? 'active' : ''}`} onClick={() => { handleSelect('goal', 'sante'); setTimeout(nextStep, 300) }} style={{ cursor: 'pointer' }}><div className="task-icon">🛡️</div><div className="task-details"><h4 style={{ margin: 0, fontSize: '1.1rem' }}>Confort articulaire</h4><p style={{ margin: 0, marginTop: '4px' }}>Pratiquer sans subir de gênes aux articulations.</p></div></div><div className={`task-card ${answers.goal === 'posture' ? 'active' : ''}`} onClick={() => { handleSelect('goal', 'posture'); setTimeout(nextStep, 300) }} style={{ cursor: 'pointer' }}><div className="task-icon">🧍</div><div className="task-details"><h4 style={{ margin: 0, fontSize: '1.1rem' }}>Améliorer ma posture</h4><p style={{ margin: 0, marginTop: '4px' }}>Ouvrir le torse et renforcer le haut du corps.</p></div></div></div></div>}
        {step === 2 && <div className="step-content"><h1 className="display-title" style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}>Ressentez-vous des gênes fréquentes ?</h1><p className="hero-description mb-8" style={{ fontSize: 'var(--text-base)' }}>Sélectionnez toutes les zones sensibles. Le programme s'adaptera.</p><div className="options-grid mb-8">{[['epaules','Oui, aux épaules'],['poignets','Oui, aux poignets'],['coudes','Oui, aux coudes'],['dos','Oui, au bas du dos'],['aucune','Aucune gêne']].map(([id,label]) => <div key={id} className={`task-card ${answers.pains.includes(id) ? 'active' : ''}`} onClick={() => togglePain(id)} style={{ cursor: 'pointer' }}><div className="task-details"><h4 style={{ margin: 0, fontSize: '1.1rem' }}>{label}</h4></div></div>)}</div><button className="btn-dark" style={{ width: '100%', padding: '1.25rem' }} onClick={nextStep} disabled={answers.pains.length === 0}>Continuer</button></div>}
        {step === 3 && <div className="step-content"><h1 className="display-title" style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}>Combien de pompes propres faites-vous aujourd'hui ?</h1><p className="hero-description mb-8" style={{ fontSize: 'var(--text-base)' }}>Buste qui touche presque le sol, corps bien droit.</p><div className="options-grid">{[['0','0 vraie pompe'],['1-5','Entre 1 et 5 pompes'],['5-15','Entre 5 et 15 pompes'],['15+','Plus de 15 pompes']].map(([id,label]) => <div key={id} className={`task-card ${answers.level === id ? 'active' : ''}`} onClick={() => { handleSelect('level', id); setTimeout(nextStep, 300) }} style={{ cursor: 'pointer' }}><div className="task-details"><h4 style={{ margin: 0, fontSize: '1.1rem' }}>{label}</h4></div></div>)}</div></div>}
        {step === 4 && <div className="step-content"><h1 className="display-title" style={{ fontSize: 'var(--text-lg)', marginBottom: '0.75rem' }}>Dernière étape pour voir votre résultat</h1><p className="hero-description mb-8" style={{ fontSize: 'var(--text-base)' }}>Nous créons votre profil personnalisé.</p><form onSubmit={handleSubmit} className="flex flex-col text-left" style={{ gap: '1.5rem' }}><div><label style={labelStyle}>Votre E-mail</label><input type="email" required style={inputStyle} placeholder="email@exemple.com" value={answers.email} onChange={e => handleSelect('email', e.target.value)} /></div><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>{[['age','Âge','Ans'],['height','Taille','cm'],['weight','Poids','kg']].map(([key,label,placeholder]) => <div key={key}><label style={labelStyle}>{label}</label><input type="number" required min={key === 'age' ? 18 : key === 'height' ? 140 : 40} max={key === 'age' ? 100 : key === 'height' ? 220 : 200} step={key === 'weight' ? '0.1' : '1'} style={inputStyle} placeholder={placeholder} value={answers[key as 'age' | 'height' | 'weight']} onChange={e => handleSelect(key, e.target.value)} /></div>)}</div>{error && <div style={{ padding: '1rem', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '0.75rem', fontSize: '0.9rem' }}>{error}</div>}<button type="submit" className="btn-dark" style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.25rem', fontSize: '1.1rem' }} disabled={isSubmitting || !answers.email || !answers.age || !answers.weight || !answers.height}>{isSubmitting ? 'Création en cours...' : 'Voir mon programme'}</button></form></div>}
      </div>
    </main>
  )
}