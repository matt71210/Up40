'use client'

import { useEffect, useMemo, useState } from 'react'

const steps = [
  { key: 'age', title: 'Pour mieux vous accompagner, quel âge avez-vous ?', subtitle: 'Cette information nous aide à adapter le rythme et les recommandations.' },
  { key: 'goal', title: 'Que souhaitez-vous améliorer en priorité ?', subtitle: 'Choisissez votre objectif principal. Vous pourrez en ajouter d’autres plus tard.' },
  { key: 'level', title: 'Comment décririez-vous votre activité actuelle ?', subtitle: 'Il n’y a pas de mauvaise réponse : nous commencerons au niveau qui vous convient aujourd’hui.' },
  { key: 'pain', title: 'Avez-vous actuellement une gêne ou une douleur ?', subtitle: 'Cette information nous aide à proposer des variantes plus confortables.' },
  { key: 'time', title: 'Combien de temps pouvez-vous consacrer à une séance ?', subtitle: 'Une séance courte et régulière vaut mieux qu’un programme trop ambitieux.' },
  { key: 'equipment', title: 'Quel matériel avez-vous à disposition ?', subtitle: 'Aucun matériel spécifique n’est nécessaire pour commencer.' },
  { key: 'pushup', title: 'Quel type de pompe vous semble accessible aujourd’hui ?', subtitle: 'Les pompes ne sont pas un test : elles servent à choisir une progression confortable.' },
]

const options: Record<string, { label: string; description?: string }[]> = {
  age: [{ label: '40 à 49 ans' }, { label: '50 à 64 ans' }, { label: '65 à 74 ans' }, { label: '75 ans ou plus' }, { label: 'Je préfère ne pas répondre' }],
  goal: [{ label: 'Me remettre en forme', description: 'Reprendre une activité progressivement.' }, { label: 'Perdre du poids', description: 'Bouger davantage et construire de bonnes habitudes.' }, { label: 'Gagner en force', description: 'Renforcer les muscles utiles au quotidien.' }, { label: 'Améliorer ma mobilité', description: 'Bouger plus facilement et entretenir mes articulations.' }, { label: 'Me sentir mieux au quotidien', description: 'Retrouver de l’énergie et de la confiance.' }],
  level: [{ label: 'Je bouge très peu en ce moment' }, { label: 'Je marche ou je bouge occasionnellement' }, { label: 'Je pratique une activité régulièrement' }, { label: 'Je suis déjà assez actif' }, { label: 'Je ne sais pas vraiment' }],
  pain: [{ label: 'Non, aucune douleur particulière' }, { label: 'Oui, aux épaules ou aux bras' }, { label: 'Oui, aux poignets ou aux mains' }, { label: 'Oui, au dos' }, { label: 'Oui, aux hanches ou aux genoux' }, { label: 'Oui, aux chevilles ou aux pieds' }, { label: 'Oui, à plusieurs endroits' }, { label: 'Je préfère en parler à un professionnel de santé' }],
  time: [{ label: '5 minutes' }, { label: '10 minutes' }, { label: '20 minutes' }, { label: '30 minutes ou plus' }, { label: 'Cela dépend de mes journées' }],
  equipment: [{ label: 'Aucun' }, { label: 'Un mur ou une chaise' }, { label: 'Un élastique' }, { label: 'Des haltères' }, { label: 'Du matériel de sport' }],
  pushup: [{ label: 'Contre un mur', description: 'Le niveau le plus accessible.' }, { label: 'Sur un support incliné', description: 'Par exemple une table solide ou un plan de travail.' }, { label: 'Sur les genoux', description: 'Une variante intermédiaire.' }, { label: 'Au sol', description: 'La version classique.' }, { label: 'Je préfère commencer autrement', description: 'Nous adapterons votre parcours.' }],
}

type Answers = Record<string, string>
const STORAGE_KEY = 'up40-onboarding-v2'

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [finished, setFinished] = useState(false)
  useEffect(() => { const saved = window.localStorage.getItem(STORAGE_KEY); if (saved) { try { const parsed = JSON.parse(saved); setStep(parsed.step ?? 0); setAnswers(parsed.answers ?? {}) } catch { window.localStorage.removeItem(STORAGE_KEY) } } }, [])
  useEffect(() => { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers })) }, [step, answers])
  const current = steps[step]
  const selected = answers[current.key]
  const progress = Math.round(((step + 1) / steps.length) * 100)
  const painReported = answers.pain && !answers.pain.startsWith('Non')
  const resultText = useMemo(() => { if (answers.goal === 'Perdre du poids') return 'Votre parcours privilégiera la régularité, le mouvement et une progression durable, sans vous pousser trop vite.'; if (answers.goal === 'Gagner en force') return 'Votre parcours privilégiera un renforcement progressif des muscles utiles au quotidien.'; if (answers.goal === 'Améliorer ma mobilité') return 'Votre parcours commencera par de la mobilité et un renforcement contrôlé, à votre rythme.'; return 'Votre parcours commencera progressivement pour vous aider à retrouver de la force, de la mobilité et de la confiance.' }, [answers.goal])
  function choose(value: string) { setAnswers((previous) => ({ ...previous, [current.key]: value })) }
  function next() { if (!selected) return; if (step < steps.length - 1) setStep(step + 1); else setFinished(true) }
  function back() { if (finished) { setFinished(false); return }; if (step > 0) setStep(step - 1) }
  function restart() { setStep(0); setAnswers({}); setFinished(false); window.localStorage.removeItem(STORAGE_KEY) }
  if (finished) return <main className='onboarding-shell'><section className='onboarding-card' aria-labelledby='result-title'><div className='onboarding-kicker'>Votre parcours Up40</div><h1 id='result-title'>Votre parcours peut commencer en douceur</h1><p>{resultText}</p>{painReported && <div className='onboarding-notice'><strong>À retenir</strong><br />Si un exercice provoque ou augmente une douleur, arrêtez-le et choisissez une variante plus facile. En cas de douleur importante, inhabituelle ou persistante, demandez conseil à un professionnel de santé.</div>}<div className='onboarding-summary'><strong>Votre profil de départ</strong><span>{answers.goal || 'Objectif à préciser'}</span><span>{answers.time || 'Durée à préciser'}</span><span>{answers.pushup || 'Niveau à préciser'}</span></div><div className='onboarding-actions'><button className='primary-button' onClick={() => window.location.assign('/program')}>Découvrir mon programme</button><button className='text-button' onClick={restart}>Recommencer</button></div></section></main>
  return <main className='onboarding-shell'><section className='onboarding-card' aria-labelledby='onboarding-title'><div className='onboarding-topline'><span>Étape {step + 1} sur {steps.length}</span><span>{progress}%</span></div><div className='onboarding-progress' aria-label={`Progression : ${progress}%`}><span style={{ width: `${progress}%` }} /></div><div className='onboarding-kicker'>Up40 · votre rythme, votre progression</div><h1 id='onboarding-title'>{current.title}</h1><p>{current.subtitle}</p><div className='onboarding-options' role='radiogroup' aria-label={current.title}>{options[current.key].map((option) => <button key={option.label} className={`onboarding-option ${selected === option.label ? 'selected' : ''}`} onClick={() => choose(option.label)} role='radio' aria-checked={selected === option.label}><span><strong>{option.label}</strong>{option.description && <small>{option.description}</small>}</span><span className='option-check' aria-hidden='true'>{selected === option.label ? '✓' : ''}</span></button>)}</div>{current.key === 'pain' && <div className='onboarding-safety'>Up40 ne pose pas de diagnostic médical et ne remplace pas un professionnel de santé.</div>}<div className='onboarding-actions'><button className='secondary-button' onClick={back} disabled={step === 0}>Retour</button><button className='primary-button' onClick={next} disabled={!selected}>{step === steps.length - 1 ? 'Voir mon résultat' : 'Continuer'}</button></div></section></main>
}
