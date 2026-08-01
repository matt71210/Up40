"use client"

import { useState } from 'react'
import Link from 'next/link'

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
      // Si on clique sur "aucune", on efface le reste
      if (painId === 'aucune') {
        return { ...prev, pains: ['aucune'] }
      }

      // Sinon, on enlève "aucune" et on toggle la douleur sélectionnée
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
      recommendedDesc = "On adapte la charge en incliné pour effacer les douleurs tout en construisant une base solide."
    } else {
      recommendedLevel = "Incliné 1 (Banc/Chaise)"
      recommendedDesc = "Idéal pour construire du volume propre sans dégrader la posture."
    }
  } else if (answers.level === '5-15') {
    if (hasPains) {
      recommendedLevel = "Excentrique Lente"
      recommendedDesc = "Vous avez la force. On va utiliser le travail excentrique pour soulager vos articulations et réparer le mouvement."
    } else {
      recommendedLevel = "Pompe Stricte (Séries courtes)"
      recommendedDesc = "On consolide votre niveau avec un focus sur la qualité d'exécution plutôt que sur la fatigue."
    }
  } else if (answers.level === '15+') {
    if (hasPains) {
      recommendedLevel = "Décharge partielle & Iso"
      recommendedDesc = "Niveau avancé, mais le corps envoie des signaux. On va renforcer vos tendons sans surcharger vos muscles."
    } else {
      recommendedLevel = "Pompe Stricte Tempo"
      recommendedDesc = "Optimisation de la biomécanique pour préserver vos acquis après 40 ans."
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="top-header">
        <div className="nav-container">
          <nav className="nav-bar">
            <Link href="/" className="logo-minimal">Up40.</Link>
            <Link href="/" className="nav-link">Annuler</Link>
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

            <div className="options-grid">
              <div 
                className={`option-card ${answers.goal === 'force' ? 'selected' : ''}`}
                onClick={() => handleSelect('goal', 'force')}
              >
                <div className="option-icon">💪</div>
                <div className="option-text">
                  <h4>Gagner en force</h4>
                  <p>Retrouver de vraies pompes complètes.</p>
                </div>
              </div>
              <div 
                className={`option-card ${answers.goal === 'sante' ? 'selected' : ''}`}
                onClick={() => handleSelect('goal', 'sante')}
              >
                <div className="option-icon">🛡️</div>
                <div className="option-text">
                  <h4>Santé articulaire</h4>
                  <p>Pratiquer sans me faire mal aux articulations.</p>
                </div>
              </div>
              <div 
                className={`option-card ${answers.goal === 'posture' ? 'selected' : ''}`}
                onClick={() => handleSelect('goal', 'posture')}
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
            <h1 className="step-title">Avez-vous des douleurs régulières ?</h1>
            <p className="step-subtitle">Sélectionnez toutes les zones concernées. Le programme s'adaptera.</p>

            <div className="options-grid">
              <div 
                className={`option-card ${answers.pains.includes('epaules') ? 'selected' : ''}`} 
                onClick={() => togglePain('epaules')}
              >
                <div className="option-icon">⚠️</div>
                <div className="option-text">
                  <h4>Oui, aux épaules</h4>
                  <p>Tensions à l'avant de l'épaule ou coiffe des rotateurs.</p>
                </div>
              </div>
              <div 
                className={`option-card ${answers.pains.includes('poignets') ? 'selected' : ''}`} 
                onClick={() => togglePain('poignets')}
              >
                <div className="option-icon">✋</div>
                <div className="option-text">
                  <h4>Oui, aux poignets</h4>
                  <p>Sensibilité en appui plat ou sous charge.</p>
                </div>
              </div>
              <div 
                className={`option-card ${answers.pains.includes('coudes') ? 'selected' : ''}`} 
                onClick={() => togglePain('coudes')}
              >
                <div className="option-icon">🦾</div>
                <div className="option-text">
                  <h4>Oui, aux coudes</h4>
                  <p>Inconfort pendant la flexion ou la poussée.</p>
                </div>
              </div>
              <div 
                className={`option-card ${answers.pains.includes('dos') ? 'selected' : ''}`} 
                onClick={() => togglePain('dos')}
              >
                <div className="option-icon">⚡</div>
                <div className="option-text">
                  <h4>Oui, au bas du dos</h4>
                  <p>Tensions lombaires pendant le gainage.</p>
                </div>
              </div>
              <div 
                className={`option-card ${answers.pains.includes('aucune') ? 'selected' : ''}`} 
                onClick={() => togglePain('aucune')}
              >
                <div className="option-icon">✅</div>
                <div className="option-text">
                  <h4>Aucune douleur</h4>
                  <p>Tout va bien de ce côté-là.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h1 className="step-title">Combien de pompes propres faites-vous aujourd'hui ?</h1>
            <p className="step-subtitle">Buste qui touche presque le sol, corps bien droit.</p>

            <div className="options-grid">
              <div className={`option-card ${answers.level === '0' ? 'selected' : ''}`} onClick={() => handleSelect('level', '0')}>
                <div className="option-text">
                  <h4>0 vraie pompe</h4>
                  <p>C'est exactement pour ça qu'on est là.</p>
                </div>
              </div>
              <div className={`option-card ${answers.level === '1-5' ? 'selected' : ''}`} onClick={() => handleSelect('level', '1-5')}>
                <div className="option-text">
                  <h4>Entre 1 et 5 pompes</h4>
                  <p>Le mouvement est là, manque de fondations.</p>
                </div>
              </div>
              <div className={`option-card ${answers.level === '5-15' ? 'selected' : ''}`} onClick={() => handleSelect('level', '5-15')}>
                <div className="option-text">
                  <h4>Entre 5 et 15 pompes</h4>
                  <p>Bon niveau, on va peaufiner la biomécanique.</p>
                </div>
              </div>
              <div className={`option-card ${answers.level === '15+' ? 'selected' : ''}`} onClick={() => handleSelect('level', '15+')}>
                <div className="option-text">
                  <h4>Plus de 15 pompes</h4>
                  <p>Niveau avancé. Focus sur le maintien articulaire.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isCalculating && (
          <div className="result-container loading-state">
            <div className="spinner"></div>
            <h2 className="step-title mt-4">Analyse en cours...</h2>
            <p className="step-subtitle">
              {hasPains 
                ? "Adaptation du protocole à vos contraintes articulaires" 
                : "Création de votre plan de progression"}
            </p>
          </div>
        )}

        {step === 4 && !isCalculating && (
          <div className="result-container">
            <div className="badge-new">Diagnostic terminé</div>
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
                  {hasPains ? 'Réhabilitation & Force' : (answers.goal === 'force' ? 'Volume propre' : 'Santé & Posture')}
                </strong>
              </div>
              {hasPains && (
                <div className="result-row" style={{ borderTop: '1px dashed var(--border)', marginTop: '0.5rem', paddingTop: '1rem' }}>
                  <span className="text-gray" style={{ color: '#0f6f67' }}>✓ Adapté pour :</span>
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
