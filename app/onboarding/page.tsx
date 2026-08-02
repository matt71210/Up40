"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<{ goal: string, pains: string[], level: string }>({ 
    goal: '', 
    pains: [], 
    level: '' 
  })
  const [isCalculating, setIsCalculating] = useState(false)

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
    if (step === 3) {
      setIsCalculating(true)
      setTimeout(() => {
        setIsCalculating(false)
        setStep(4)
      }, 1500)
    } else {
      setStep(s => s + 1)
    }
  }

  const prevStep = () => {
    setStep(s => s - 1)
  }

  // Calcul du résultat
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

  
  useEffect(() => {
    if (step === 4 && !isCalculating) {
      localStorage.setItem('up40_user_level', recommendedLevel);
      localStorage.setItem('up40_user_pains', JSON.stringify(answers.pains));
    }
  }, [step, isCalculating, recommendedLevel, answers.pains]);

  return (
    <main className="min-h-screen bg-white">
      <header className="top-header">
        <div className="nav-container">
          <nav className="nav-bar">
            <Link href="/" className="logo-minimal">Up40.</Link>
            <div className="nav-actions"><Link href="/" className="nav-link" style={{fontWeight: "bold"}}>✕ FERMER</Link><ThemeToggle /></div>
          </nav>
        </div>
      </header>

      <div className="onboarding-container">
        {step < 4 && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        )}

        {step === 1 && (
          <div className="step-content">
            <h1 className="step-title">Quel est votre objectif principal ?</h1>
            <p className="step-subtitle">Up40 s'adapte à votre priorité du moment.</p>

            <div className="editorial-list">
              <div className={`editorial-item ${answers.goal === 'force' ? 'selected' : ''}`} onClick={() => handleSelect('goal', 'force')}>
  <div className="ed-item-content">
    <span className="ed-item-title">Gagner en force</span>
    <span className="ed-item-desc">Retrouver de vraies pompes complètes.</span>
  </div>
  <div className="ed-item-radio"></div>
</div>
              <div className={`editorial-item ${answers.goal === 'sante' ? 'selected' : ''}`} onClick={() => handleSelect('goal', 'sante')}>
  <div className="ed-item-content">
    <span className="ed-item-title">Confort articulaire</span>
    <span className="ed-item-desc">Pratiquer sans subir de gênes aux articulations.</span>
  </div>
  <div className="ed-item-radio"></div>
</div>
              <div className={`editorial-item ${answers.goal === 'posture' ? 'selected' : ''}`} onClick={() => handleSelect('goal', 'posture')}>
  <div className="ed-item-content">
    <span className="ed-item-title">Améliorer ma posture</span>
    <span className="ed-item-desc">Ouvrir le torse et renforcer le haut du corps.</span>
  </div>
  <div className="ed-item-radio"></div>
</div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h1 className="step-title">Ressentez-vous des gênes fréquentes ?</h1>
            <p className="step-subtitle">Sélectionnez toutes les zones sensibles. Le programme s'adaptera.</p>

            <div className="editorial-list">
              <div className={`editorial-item ${answers.pains.includes('epaules') ? 'selected' : ''}`} onClick={() => togglePain('epaules')}>
  <div className="ed-item-content">
    <span className="ed-item-title">Gênes aux épaules</span>
    <span className="ed-item-desc">Inconforts à l'avant de l'épaule ou coiffe des rotateurs.</span>
  </div>
  <div className="ed-item-radio"></div>
</div>
              <div className={`editorial-item ${answers.pains.includes('poignets') ? 'selected' : ''}`} onClick={() => togglePain('poignets')}>
  <div className="ed-item-content">
    <span className="ed-item-title">Gênes aux poignets</span>
    <span className="ed-item-desc">Sensibilité en appui plat ou sous charge.</span>
  </div>
  <div className="ed-item-radio"></div>
</div>
              <div className={`editorial-item ${answers.pains.includes('coudes') ? 'selected' : ''}`} onClick={() => togglePain('coudes')}>
  <div className="ed-item-content">
    <span className="ed-item-title">Gênes aux coudes</span>
    <span className="ed-item-desc">Inconfort pendant la flexion ou la poussée.</span>
  </div>
  <div className="ed-item-radio"></div>
</div>
              <div className={`editorial-item ${answers.pains.includes('dos') ? 'selected' : ''}`} onClick={() => togglePain('dos')}>
  <div className="ed-item-content">
    <span className="ed-item-title">Gênes au dos</span>
    <span className="ed-item-desc">Tensions lombaires pendant le gainage.</span>
  </div>
  <div className="ed-item-radio"></div>
</div>
              <div className={`editorial-item ${answers.pains.includes('aucune') ? 'selected' : ''}`} onClick={() => togglePain('aucune')}>
  <div className="ed-item-content">
    <span className="ed-item-title">Aucune gêne</span>
    <span className="ed-item-desc">Tout va bien de ce côté-là.</span>
  </div>
  <div className="ed-item-radio"></div>
</div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h1 className="step-title">Combien de pompes propres faites-vous aujourd'hui ?</h1>
            <p className="step-subtitle">Buste qui touche presque le sol, corps bien droit.</p>

            <div className="editorial-list">
              <div className={`editorial-item ${answers.level === '0' ? 'selected' : ''}`} onClick={() => handleSelect('level', '0')}>
  <div className="ed-item-content">
    <span className="ed-item-title">0 vraie pompe</span>
    <span className="ed-item-desc">C'est exactement pour ça qu'on est là.</span>
  </div>
  <div className="ed-item-radio"></div>
</div>
              <div className={`editorial-item ${answers.level === '1-5' ? 'selected' : ''}`} onClick={() => handleSelect('level', '1-5')}>
  <div className="ed-item-content">
    <span className="ed-item-title">Entre 1 et 5 pompes</span>
    <span className="ed-item-desc">Le mouvement est là, manque de fondations.</span>
  </div>
  <div className="ed-item-radio"></div>
</div>
              <div className={`editorial-item ${answers.level === '5-15' ? 'selected' : ''}`} onClick={() => handleSelect('level', '5-15')}>
  <div className="ed-item-content">
    <span className="ed-item-title">Entre 5 et 15 pompes</span>
    <span className="ed-item-desc">Bon niveau, on va peaufiner la biomécanique.</span>
  </div>
  <div className="ed-item-radio"></div>
</div>
              <div className={`editorial-item ${answers.level === '15+' ? 'selected' : ''}`} onClick={() => handleSelect('level', '15+')}>
  <div className="ed-item-content">
    <span className="ed-item-title">Plus de 15 pompes</span>
    <span className="ed-item-desc">Niveau avancé. Focus sur le maintien articulaire.</span>
  </div>
  <div className="ed-item-radio"></div>
</div>
            </div>
          </div>
        )}

        {isCalculating && (
          <div className="result-container loading-state">
            <div className="spinner"></div>
            <h2 className="step-title mt-4">Évaluation en cours...</h2>
            <p className="step-subtitle">
              {hasPains 
                ? "Adaptation du protocole à vos sensibilités" 
                : "Création de votre plan de progression"}
            </p>
          </div>
        )}

        {step === 4 && !isCalculating && (
          <div className="result-container">
            <div className="badge-new">Bilan terminé</div>
            <h2 className="result-title">Votre point de départ idéal :</h2>
            <div className="result-level">{recommendedLevel}</div>
            <p className="hero-description mx-auto mb-8">
              {recommendedDesc}
            </p>
            <div className="result-card mb-8">
              <div className="result-row">
                <span className="text-gray">Fréquence :</span>
                <strong>3x / semaine</strong>
              </div>
              <div className="result-row">
                <span className="text-gray">Durée :</span>
                <strong>12 minutes</strong>
              </div>
              <div className="result-row">
                <span className="text-gray">Focus :</span>
                <strong>
                  {hasPains ? 'Préservation & Force' : (answers.goal === 'force' ? 'Volume propre' : 'Confort & Posture')}
                </strong>
              </div>
              {hasPains && (
                <div className="result-row" style={{ borderTop: '1px dashed var(--border)', marginTop: '0.5rem', paddingTop: '1rem' }}>
                  <span className="text-gray" style={{ color: '#0f6f67' }}>✓ Adapté pour préserver :</span>
                  <strong style={{ color: '#0f6f67', textAlign: 'right' }}>
                    {answers.pains.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(', ')}
                  </strong>
                </div>
              )}
            </div>
            <Link href="/program" className="btn-dark block text-center w-full">Générer mon programme gratuit</Link>
          </div>
        )}

        {step < 4 && (
          <div className="action-bar">
            {step > 1 ? (
              <button className="btn-prev" onClick={prevStep}>← Précédent</button>
            ) : <div></div>}

            <button 
              className="btn-next" 
              onClick={nextStep}
              disabled={
                (step === 1 && !answers.goal) || 
                (step === 2 && answers.pains.length === 0) || 
                (step === 3 && !answers.level)
              }
            >
              Continuer →
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
