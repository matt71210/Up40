"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ThemeToggle from '../ThemeToggle'

export default function Program() {
  const [userLevel, setUserLevel] = useState<number | null>(null)
  const [userPains, setUserPains] = useState<string[]>([])

  useEffect(() => {
    const savedLevel = localStorage.getItem('up40_user_level')
    const savedPains = localStorage.getItem('up40_user_pains')

    if (savedPains) {
      try { 
        const parsed = JSON.parse(savedPains).filter((p: string) => p !== 'aucune');
        setUserPains(parsed) 
      } catch (e) {}
    }

    if (savedLevel) {
      if (savedLevel.includes("Mur")) setUserLevel(1);
      else if (savedLevel.includes("Incliné 1")) setUserLevel(2);
      else if (savedLevel.includes("Incliné Bas")) setUserLevel(3);
      else if (savedLevel.includes("Excentrique")) setUserLevel(4);
      else if (savedLevel.includes("Stricte") || savedLevel.includes("Décharge")) setUserLevel(5);
      else setUserLevel(3);
    }
  }, [])

  const isHighlight = (level: number) => {
    if (userLevel === null) return level === 6; // Default behavior if no onboarding done
    return level === userLevel;
  }

  const getWeekLabel = (level: number) => {
    if (!userLevel) {
      const start = (level - 1) * 2 + 1;
      return level === 6 ? `Semaines ${start}+` : `Semaines ${start}-${start+1}`;
    }
    if (level < userLevel) return "✓ Acquis";

    const offset = level - userLevel;
    const startWeek = offset * 2 + 1;
    return level === 6 ? `Semaines ${startWeek}+` : `Semaines ${startWeek}-${startWeek+1}`;
  }


  return (
    <main className="min-h-screen bg-white">
      <header className="top-header">
        <div className="nav-container">
          <nav className="nav-bar">
            <Link href="/" className="logo-minimal">Up40.</Link>
            <div className="nav-actions" style={{ display: "flex", alignItems: "center" }}>
              <div className="nav-links">
                <Link href="/program" className="nav-link" style={{ color: 'var(--brand)' }}>La méthode</Link>
                <Link href="/premium" className="nav-btn">Premium</Link>
              </div>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <div className="program-container">
        <section className="program-header text-center">
          <div className="badge-new mx-auto">
            {userLevel ? "Votre programme personnalisé" : "La Méthode Up40"}
          </div>
          <h1 className="display-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            Biomécanique & Progression.
          </h1>
          <p className="hero-description mx-auto">
            Le but n'est pas d'enchaîner 100 répétitions cassées, mais de reconstruire une force solide et saine. Voici le chemin exact, l'inclinaison requise, et les accessoires idéaux.
          </p>

          {userPains.length > 0 && (
            <div style={{ background: 'rgba(15,111,103,0.1)', color: 'var(--brand)', padding: '14px 20px', borderRadius: '12px', margin: '2rem auto 0', maxWidth: '500px', fontSize: '0.95rem', fontWeight: 600, border: '1px solid rgba(15,111,103,0.2)' }}>
              ✓ Bilan appliqué : Protocole ajusté pour préserver vos {userPains.join(', ')}.
            </div>
          )}
        

            {/* Niveau 6 */}
            <div className="timeline-item">
              <div className={`timeline-marker ${isHighlight(6) ? 'highlight-marker' : ''}`}>6</div>
              <div className={`timeline-content ${isHighlight(6) ? 'border-highlight' : ''}`}>
                <div className="flex" style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <div className={`level-badge ${isHighlight(6) ? 'highlight-badge' : ''}`}>{getWeekLabel(6)}</div>
                  {isHighlight(6) && <span style={{fontSize:'0.75rem', fontWeight:800, color:'var(--brand)', textTransform:'uppercase'}}>Votre point de départ</span>}
                </div>
                <h3>L'Athlète 40+ (Surcharge & Anneaux)</h3>
                <p>La base est incassable, on passe au niveau supérieur. L'entraînement évolue vers des cycles d'hypertrophie et de puissance : pompes en déficit profond, instabilité totale sur anneaux de gymnastique, ou utilisation d'un gilet lesté. On ajoute un travail spécifique des deltoïdes postérieurs pour un équilibre parfait.</p>
                <div className="accessory-box" style={{ borderColor: 'var(--brand)', backgroundColor: 'var(--brand-soft)' }}>
                  <strong>Installation :</strong> Sangles de suspension (anneaux) ou Gilet Lesté de 10 à 20kg.
                </div>
                <div className="level-details mt-4">
                  <span className={`detail-tag ${isHighlight(6) ? 'highlight-tag' : ''}`}>Focus: Hypertrophie, Puissance & Longévité</span>
                  <span className={`detail-tag ${isHighlight(6) ? 'highlight-tag' : ''}`}>Charge: 100% pdc + Lest / Instabilité</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="timeline-section">
          <div className="timeline">

            {/* Niveau 1 */}
            <div className="timeline-item">
              <div className={`timeline-marker ${isHighlight(1) ? 'highlight-marker' : ''}`}>1</div>
              <div className={`timeline-content ${isHighlight(1) ? 'border-highlight' : ''}`}>
                <div className="flex" style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <div className={`level-badge ${isHighlight(1) ? 'highlight-badge' : ''}`}>{getWeekLabel(1)}</div>
                  {isHighlight(1) && <span style={{fontSize:'0.75rem', fontWeight:800, color:'var(--brand)', textTransform:'uppercase'}}>Votre point de départ</span>}
                </div>
                <h3>Fondations : Appui Mur</h3>
                <p>Réveil du système nerveux. On réapprend à gainer la sangle abdominale et à placer les omoplates sans aucune charge sur les poignets.</p>
                <div className="accessory-box">
                  <strong>Installation :</strong> Face à un mur, pieds à 1 mètre du mur. 
                </div>
                <div className="level-details mt-4">
                  <span className={`detail-tag ${isHighlight(1) ? 'highlight-tag' : ''}`}>Focus: Alignement</span>
                  <span className={`detail-tag ${isHighlight(1) ? 'highlight-tag' : ''}`}>Charge: ~20% pdc</span>
                </div>
              </div>
            </div>

            {/* Niveau 2 */}
            <div className="timeline-item">
              <div className={`timeline-marker ${isHighlight(2) ? 'highlight-marker' : ''}`}>2</div>
              <div className={`timeline-content ${isHighlight(2) ? 'border-highlight' : ''}`}>
                <div className="flex" style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <div className={`level-badge ${isHighlight(2) ? 'highlight-badge' : ''}`}>{getWeekLabel(2)}</div>
                  {isHighlight(2) && <span style={{fontSize:'0.75rem', fontWeight:800, color:'var(--brand)', textTransform:'uppercase'}}>Votre point de départ</span>}
                </div>
                <h3>Incliné Haut (~80cm)</h3>
                <p>Introduction de la charge. Le buste descend vers les mains. C'est ici que l'on construit le volume propre et l'endurance des triceps sans imposer un stress inutile à la coiffe des rotateurs.</p>
                <div className="accessory-box">
                  <strong>Installation :</strong> Un plan de travail de cuisine, une table de salle à manger solide, ou des <em>sangles de suspension (TRX)</em> fixées en haut d'une porte.
                </div>
                <div className="level-details mt-4">
                  <span className={`detail-tag ${isHighlight(2) ? 'highlight-tag' : ''}`}>Focus: Volume</span>
                  <span className={`detail-tag ${isHighlight(2) ? 'highlight-tag' : ''}`}>Charge: ~40% pdc</span>
                </div>
              </div>
            </div>

            {/* Niveau 3 */}
            <div className="timeline-item">
              <div className={`timeline-marker ${isHighlight(3) ? 'highlight-marker' : ''}`}>3</div>
              <div className={`timeline-content ${isHighlight(3) ? 'border-highlight' : ''}`}>
                <div className="flex" style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <div className={`level-badge ${isHighlight(3) ? 'highlight-badge' : ''}`}>{getWeekLabel(3)}</div>
                  {isHighlight(3) && <span style={{fontSize:'0.75rem', fontWeight:800, color:'var(--brand)', textTransform:'uppercase'}}>Votre point de départ</span>}
                </div>
                <h3>Incliné Bas (~40cm)</h3>
                <p>La charge devient sérieuse. On réduit l'inclinaison de moitié. Le gainage doit être parfait pour ne pas creuser le dos. Les pectoraux prennent le relais.</p>
                <div className="accessory-box">
                  <strong>Installation :</strong> Un banc de musculation, un canapé ferme, la 2ème/3ème marche d'un escalier, ou une <em>box de plyométrie</em>.
                </div>
                <div className="level-details mt-4">
                  <span className={`detail-tag ${isHighlight(3) ? 'highlight-tag' : ''}`}>Focus: Force de poussée</span>
                  <span className={`detail-tag ${isHighlight(3) ? 'highlight-tag' : ''}`}>Charge: ~55% pdc</span>
                </div>
              </div>
            </div>

            {/* Niveau 4 */}
            <div className="timeline-item">
              <div className={`timeline-marker ${isHighlight(4) ? 'highlight-marker' : ''}`}>4</div>
              <div className={`timeline-content ${isHighlight(4) ? 'border-highlight' : ''}`}>
                <div className="flex" style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <div className={`level-badge ${isHighlight(4) ? 'highlight-badge' : ''}`}>{getWeekLabel(4)}</div>
                  {isHighlight(4) && <span style={{fontSize:'0.75rem', fontWeight:800, color:'var(--brand)', textTransform:'uppercase'}}>Votre point de départ</span>}
                </div>
                <h3>Force Excentrique & Transfert au Sol</h3>
                <p>Le programme se densifie. On passe au sol sur la phase de descente (hyper-lente de 5 secondes) pour blinder les tendons. Le protocole intègre désormais des routines avancées de mobilité scapulaire et de gainage dynamique pour préparer le corps à la charge totale.</p>
                <div className="accessory-box">
                  <strong>Installation :</strong> Au sol. Utilisation de <em>poignées de pompes (parallettes)</em> fortement recommandée si vous avez les poignets sensibles.
                </div>
                <div className="level-details mt-4">
                  <span className={`detail-tag ${isHighlight(4) ? 'highlight-tag' : ''}`}>Focus: Densité tendineuse & Core</span>
                  <span className={`detail-tag ${isHighlight(4) ? 'highlight-tag' : ''}`}>Charge: 100% pdc (descente)</span>
                </div>
              </div>
            </div>

            {/* Niveau 5 */}
            <div className="timeline-item">
              <div className={`timeline-marker ${isHighlight(5) ? 'highlight-marker' : ''}`}>5</div>
              <div className={`timeline-content ${isHighlight(5) ? 'border-highlight' : ''}`}>
                <div className="flex" style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <div className={`level-badge ${isHighlight(5) ? 'highlight-badge' : ''}`}>{getWeekLabel(5)}</div>
                  {isHighlight(5) && <span style={{fontSize:'0.75rem', fontWeight:800, color:'var(--brand)', textTransform:'uppercase'}}>Votre point de départ</span>}
                </div>
                <h3>La Pompe Stricte (Sol)</h3>
                <p>Le graal du poids de corps. Buste gainé, amplitude complète frôlant le sol, rythme contrôlé. On valide des séries longues (15-20 répétitions) sans aucune dégradation de la posture ni compensation par les épaules.</p>
                <div className="accessory-box">
                  <strong>Installation :</strong> Au sol. Poignées recommandées si les poignets fatiguent sur les séries longues.
                </div>
                <div className="level-details mt-4">
                  <span className={`detail-tag ${isHighlight(5) ? 'highlight-tag' : ''}`}>Focus: Volume & Endurance musculaire</span>
                  <span className={`detail-tag ${isHighlight(5) ? 'highlight-tag' : ''}`}>Charge: 100% pdc</span>
                </div>
              </div>
            </div>

            {/* Niveau 6 */}
            <div className="timeline-item">
              <div className={`timeline-marker ${isHighlight(6) ? 'highlight-marker' : ''}`}>6</div>
              <div className={`timeline-content ${isHighlight(6) ? 'border-highlight' : ''}`}>
                <div className="flex" style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <div className={`level-badge ${isHighlight(6) ? 'highlight-badge' : ''}`}>{getWeekLabel(6)}</div>
                  {isHighlight(6) && <span style={{fontSize:'0.75rem', fontWeight:800, color:'var(--brand)', textTransform:'uppercase'}}>Votre point de départ</span>}
                </div>
                <h3>L'Athlète 40+</h3>
                <p>La base est incassable, on passe au niveau supérieur. L'entraînement évolue vers des cycles d'hypertrophie et de puissance : pompes en déficit profond, instabilité totale sur anneaux de gymnastique, ou utilisation d'un gilet lesté. On ajoute un travail spécifique des deltoïdes postérieurs pour un équilibre parfait.</p>
                <div className="accessory-box" style={{ borderColor: 'var(--brand)', backgroundColor: 'var(--brand-soft)' }}>
                  <strong>Installation :</strong> Sangles de suspension (anneaux) ou Gilet Lesté de 10 à 20kg.
                </div>
                <div className="level-details mt-4">
                  <span className={`detail-tag ${isHighlight(6) ? 'highlight-tag' : ''}`}>Focus: Hypertrophie & Puissance</span>
                  <span className={`detail-tag ${isHighlight(6) ? 'highlight-tag' : ''}`}>Charge: 100% pdc + Lest</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="accessories-section">
          <h2 className="mb-8" style={{ fontSize: '1.6rem', fontWeight: 800 }}>Le matériel recommandé</h2>
          <p className="hero-description" style={{ fontSize: '1rem' }}>
            Bien que le programme soit réalisable à 100% avec le mobilier de la maison (table, canapé, sol), deux accessoires abordables peuvent transformer votre progression et préserver vos articulations.
          </p>

          <div className="acc-card">
            <div className="acc-icon">⭕</div>
            <div className="acc-details">
              <h4>Sangles de suspension (Type TRX ou Anneaux)</h4>
              <p>Idéal pour régler l'inclinaison au millimètre près. Les poignées rotatives apportent du confort aux poignets et forcent le gainage profond.</p>
            </div>
          </div>

          <div className="acc-card">
            <div className="acc-icon">🏗️</div>
            <div className="acc-details">
              <h4>Poignées de pompes (Parallettes)</h4>
              <p>Indispensable à partir du niveau 4 (sol) si vous ressentez des pincements aux poignets. Elles permettent de garder le poignet dans un axe neutre et droit.</p>
            </div>
          </div>
        

            {/* Niveau 6 */}
            <div className="timeline-item">
              <div className={`timeline-marker ${isHighlight(6) ? 'highlight-marker' : ''}`}>6</div>
              <div className={`timeline-content ${isHighlight(6) ? 'border-highlight' : ''}`}>
                <div className="flex" style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <div className={`level-badge ${isHighlight(6) ? 'highlight-badge' : ''}`}>{getWeekLabel(6)}</div>
                  {isHighlight(6) && <span style={{fontSize:'0.75rem', fontWeight:800, color:'var(--brand)', textTransform:'uppercase'}}>Votre point de départ</span>}
                </div>
                <h3>L'Athlète 40+ (Surcharge & Anneaux)</h3>
                <p>La base est incassable, on passe au niveau supérieur. L'entraînement évolue vers des cycles d'hypertrophie et de puissance : pompes en déficit profond, instabilité totale sur anneaux de gymnastique, ou utilisation d'un gilet lesté. On ajoute un travail spécifique des deltoïdes postérieurs pour un équilibre parfait.</p>
                <div className="accessory-box" style={{ borderColor: 'var(--brand)', backgroundColor: 'var(--brand-soft)' }}>
                  <strong>Installation :</strong> Sangles de suspension (anneaux) ou Gilet Lesté de 10 à 20kg.
                </div>
                <div className="level-details mt-4">
                  <span className={`detail-tag ${isHighlight(6) ? 'highlight-tag' : ''}`}>Focus: Hypertrophie, Puissance & Longévité</span>
                  <span className={`detail-tag ${isHighlight(6) ? 'highlight-tag' : ''}`}>Charge: 100% pdc + Lest / Instabilité</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {!userLevel && (
          <div className="text-center mt-4">
            <Link href="/onboarding" className="btn-dark">Commencer mon bilan</Link>
          </div>
        )}
      </div>

      <div className="footer-spacing"></div>

      <nav className="bottom-nav">
        <Link href="/" className="nav-item">Accueil</Link>
        <Link href="/onboarding" className="nav-item">Bilan</Link>
        <Link href="/program" className="nav-item active">Méthode</Link>
        <Link href="/progress" className="nav-item">Progrès</Link>
        <Link href="/premium" className="nav-item">Premium</Link>
      </nav>
    </main>
  )
}
