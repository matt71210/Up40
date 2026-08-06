"use client"

import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'
import { createClient } from '@supabase/supabase-js'

// Initialisation de Supabase côté client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<{ 
    goal: string, 
    pains: string[], 
    level: string,
    email: string,
    age: string,
    weight: string
  }>({ 
    goal: '', 
    pains: [], 
    level: '',
    email: '',
    age: '',
    weight: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSelect = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  const togglePain = (painId: string) => {
    setAnswers(prev => {
      if (painId === 'aucune') {
        return { ...prev, pains: ['aucune'] }
      }

      let newPains = prev.pains.filter(p => p !== 'aucune')

      if (newPains.includes(painId)) {
        newPains = newPains.filter(p => p !== painId)
      } else {
        newPains = [...newPains, painId]
      }

      return { ...prev, pains: newPains }
    })
  }

  const nextStep = () => {
    setStep(s => s + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // 1. Inscription (Auth) en passant les infos du profil dans raw_user_meta_data
      const { data, error: authError } = await supabase.auth.signUp({
        email: answers.email,
        password: 'User_Temp_Password_123!', // Mot de passe temporaire pour le MVP
        options: {
          data: {
            age: parseInt(answers.age),
            weight_kg: parseFloat(answers.weight),
            fitness_goal: answers.goal,
            has_pain: answers.pains.length > 0 && !answers.pains.includes('aucune'),
            pain_areas: answers.pains,
            // Mapping du niveau : "0"->0, "1-5"->1, "5-15"->2, "15+"->3 (Exemple basique)
            current_push_level: answers.level === '0' ? 0 : answers.level === '1-5' ? 1 : answers.level === '5-15' ? 2 : 3
          }
        }
      })

      if (authError) throw authError

      // Succès
      setIsSuccess(true)
      
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Une erreur est survenue lors de l'enregistrement.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calcul du résultat local pour l'affichage
  let recommendedLevel = "Incliné 1"
  let recommendedDesc = "Départ stable avec travail d'appuis et contrôle."

  const hasPains = answers.pains.length > 0 && !answers.pains.includes('aucune')

  if (answers.level === '0') {
    recommendedLevel = "Appui Mur"
    recommendedDesc = "L'étape parfaite pour reconnecter le cerveau et les pecs sans aucun stress articulaire."
  } else if (answers.level === '1-5') {
    if (hasPains) {
      recommendedLevel = "Incliné 1 (Contrôle Articulaire)"
      recommendedDesc = "On adapte la charge en incliné pour effacer les inconforts tout en construisant une base solide."
    } else {
      recommendedLevel = "Incliné 1 (Banc/Chaise)"
      recommendedDesc = "Idéal pour construire du volume propre sans dégrader la posture."
    }
  } else if (answers.level === '5-15') {
    if (hasPains) {
      recommendedLevel = "Excentrique Lente"
      recommendedDesc = "Vous avez la force. On va utiliser le travail excentrique pour ménager vos articulations et consolider le mouvement."
    } else {
      recommendedLevel = "Pompe Stricte (Séries courtes)"
      recommendedDesc = "On consolide votre niveau avec un focus sur la qualité d'exécution plutôt que sur la fatigue."
    }
  } else if (answers.level === '15+') {
    if (hasPains) {
      recommendedLevel = "Décharge partielle & Iso"
      recommendedDesc = "Niveau avancé, mais le corps envoie des signaux. On va renforcer vos tendons sans surcharger les articulations."
    } else {
      recommendedLevel = "Pompe Stricte Tempo"
      recommendedDesc = "Optimisation de la biomécanique pour préserver vos acquis après 40 ans."
    }
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="badge-new mb-4">Bilan Terminé</div>
        <h1 className="display-title mb-4">Votre niveau recommandé :<br/><span className="text-blue-600">{recommendedLevel}</span></h1>
        <p className="hero-description max-w-md mx-auto mb-8">{recommendedDesc}</p>
        <p className="text-gray-600 mb-8">Votre profil a bien été sauvegardé !</p>
        <Link href="/" className="btn-dark">Retour à l'accueil</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="top-header transparent">
        <div className="nav-container">
          <nav className="nav-bar">
            <Link href="/" className="logo-minimal">Up40.</Link>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link href="/" className="nav-link">Annuler</Link>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <section className="onboarding-photo-hero text-center">
        <div className="badge-new mx-auto">Bilan Personnalisé</div>
        <h1 className="display-title mt-2" style={{ fontSize: '2rem' }}>Votre Profil</h1>
      </section>

      <div className="onboarding-container" style={{ paddingTop: 0 }}>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>

        {step === 1 && (
          <div className="step-content">
            <h1 className="step-title">Quel est votre objectif principal ?</h1>
            <p className="step-subtitle">Up40 s'adapte à votre priorité du moment.</p>

            <div className="options-grid">
              <div 
                className={`option-card ${answers.goal === 'force' ? 'selected' : ''}`}
                onClick={() => { handleSelect('goal', 'force'); setTimeout(nextStep, 300) }}
              >
                <div className="option-icon">💪</div>
                <div className="option-text">
                  <h4>Gagner en force</h4>
                  <p>Retrouver de vraies pompes complètes.</p>
                </div>
              </div>
              <div 
                className={`option-card ${answers.goal === 'sante' ? 'selected' : ''}`}
                onClick={() => { handleSelect('goal', 'sante'); setTimeout(nextStep, 300) }}
              >
                <div className="option-icon">🛡️</div>
                <div className="option-text">
                  <h4>Confort articulaire</h4>
                  <p>Pratiquer sans subir de gênes aux articulations.</p>
                </div>
              </div>
              <div 
                className={`option-card ${answers.goal === 'posture' ? 'selected' : ''}`}
                onClick={() => { handleSelect('goal', 'posture'); setTimeout(nextStep, 300) }}
              >
                <div className="option-icon">🧍</div>
                <div className="option-text">
                  <h4>Améliorer ma posture</h4>
                  <p>Ouvrir le torse et renforcer le haut du corps.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h1 className="step-title">Ressentez-vous des gênes fréquentes ?</h1>
            <p className="step-subtitle">Sélectionnez toutes les zones sensibles. Le programme s'adaptera.</p>

            <div className="options-grid mb-6">
              <div className={`option-card ${answers.pains.includes('epaules') ? 'selected' : ''}`} onClick={() => togglePain('epaules')}>
                <div className="option-text"><h4>Oui, aux épaules</h4></div>
              </div>
              <div className={`option-card ${answers.pains.includes('poignets') ? 'selected' : ''}`} onClick={() => togglePain('poignets')}>
                <div className="option-text"><h4>Oui, aux poignets</h4></div>
              </div>
              <div className={`option-card ${answers.pains.includes('coudes') ? 'selected' : ''}`} onClick={() => togglePain('coudes')}>
                <div className="option-text"><h4>Oui, aux coudes</h4></div>
              </div>
              <div className={`option-card ${answers.pains.includes('dos') ? 'selected' : ''}`} onClick={() => togglePain('dos')}>
                <div className="option-text"><h4>Oui, au bas du dos</h4></div>
              </div>
              <div className={`option-card ${answers.pains.includes('aucune') ? 'selected' : ''}`} onClick={() => togglePain('aucune')}>
                <div className="option-text"><h4>Aucune gêne</h4></div>
              </div>
            </div>
            
            <button 
              className="btn-dark w-full" 
              onClick={nextStep}
              disabled={answers.pains.length === 0}
            >
              Continuer
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h1 className="step-title">Combien de pompes propres faites-vous aujourd'hui ?</h1>
            <p className="step-subtitle">Buste qui touche presque le sol, corps bien droit.</p>

            <div className="options-grid">
              <div className={`option-card ${answers.level === '0' ? 'selected' : ''}`} onClick={() => { handleSelect('level', '0'); setTimeout(nextStep, 300) }}>
                <div className="option-text"><h4>0 vraie pompe</h4></div>
              </div>
              <div className={`option-card ${answers.level === '1-5' ? 'selected' : ''}`} onClick={() => { handleSelect('level', '1-5'); setTimeout(nextStep, 300) }}>
                <div className="option-text"><h4>Entre 1 et 5 pompes</h4></div>
              </div>
              <div className={`option-card ${answers.level === '5-15' ? 'selected' : ''}`} onClick={() => { handleSelect('level', '5-15'); setTimeout(nextStep, 300) }}>
                <div className="option-text"><h4>Entre 5 et 15 pompes</h4></div>
              </div>
              <div className={`option-card ${answers.level === '15+' ? 'selected' : ''}`} onClick={() => { handleSelect('level', '15+'); setTimeout(nextStep, 300) }}>
                <div className="option-text"><h4>Plus de 15 pompes</h4></div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content">
            <h1 className="step-title">Dernière étape pour voir votre résultat</h1>
            <p className="step-subtitle">Nous créons votre profil personnalisé.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6 text-left">
              <div>
                <label className="block text-sm font-medium mb-1">Votre E-mail</label>
                <input 
                  type="email" 
                  required 
                  className="w-full p-3 border rounded-md"
                  placeholder="email@exemple.com"
                  value={answers.email}
                  onChange={e => handleSelect('email', e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Âge</label>
                  <input 
                    type="number" 
                    required 
                    min="18" max="100"
                    className="w-full p-3 border rounded-md"
                    placeholder="Ex: 42"
                    value={answers.age}
                    onChange={e => handleSelect('age', e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Poids (kg)</label>
                  <input 
                    type="number" 
                    required 
                    step="0.1" min="40" max="200"
                    className="w-full p-3 border rounded-md"
                    placeholder="Ex: 75.5"
                    value={answers.weight}
                    onChange={e => handleSelect('weight', e.target.value)}
                  />
                </div>
              </div>

              {error && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}

              <button 
                type="submit" 
                className="btn-dark w-full mt-4 flex justify-center items-center h-12"
                disabled={isSubmitting || !answers.email || !answers.age || !answers.weight}
              >
                {isSubmitting ? 'Création en cours...' : 'Voir mon programme'}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}