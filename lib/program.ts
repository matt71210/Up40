export type PainArea = string

export type ProfileInput = {
  current_push_level?: string | null
  pain_areas?: PainArea[] | null
  has_pain?: boolean | null
  fitness_goal?: string | null
  height_cm?: number | null
  weight_kg?: number | null
}

export type ProgramAdjustment = {
  level: number
  title: string
  goal: string
  frequency: number
  cycleWeeks: number
  bmi: number | null
  volume: 'standard' | 'reduced'
  restSeconds: number
  incline: 'standard' | 'higher'
}

export function calculateBmi(heightCm?: number | null, weightKg?: number | null) {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return null
  return Math.round((weightKg / ((heightCm / 100) ** 2)) * 10) / 10
}

function hasPain(profile: ProfileInput) {
  return profile.has_pain === true || Boolean(profile.pain_areas?.length)
}

function baseLevel(level?: string | null, pain = false) {
  const value = (level || '').toLowerCase()
  if (value.includes('15+') || value.includes('15')) return pain ? 4 : 5
  if (value.includes('5 à 15') || value.includes('5-15') || value.includes('5')) return pain ? 4 : 5
  if (value.includes('1 à 5') || value.includes('1-5') || value.includes('1')) return 2
  if (value.includes('0') || value.includes('mur')) return 1
  return 3
}

export function getProgramAdjustment(profile: ProfileInput): ProgramAdjustment {
  const bmi = calculateBmi(profile.height_cm, profile.weight_kg)
  const pain = hasPain(profile)
  let level = baseLevel(profile.current_push_level, pain)
  const highBmi = bmi !== null && bmi >= 25
  const veryHighBmi = bmi !== null && bmi >= 30
  if (veryHighBmi && level > 2) level -= 1
  const reducedVolume = pain || highBmi
  return {
    level,
    title:
      level === 1
        ? 'Fondations : Appui Mur'
        : level === 2
        ? 'Incliné Haut'
        : level === 3
        ? 'Incliné Bas'
        : level === 4
        ? 'Force Excentrique'
        : 'Pompe Stricte',
    goal: profile.fitness_goal || 'Force et progression sans douleur',
    frequency: 3,
    cycleWeeks: 8,
    bmi,
    volume: reducedVolume ? 'reduced' : 'standard',
    restSeconds: veryHighBmi || pain ? 120 : 90,
    incline: veryHighBmi ? 'higher' : 'standard',
  }
}

// --- Plan structurÃ© pour le niveau 3 (Incliné Bas) ---

export type SessionBlock = {
  name: string
  description: string
  sets?: number
  reps?: number
  tempo?: string
  restSeconds?: number
}

export type Session = {
  title: string
  focus: 'technique' | 'volume' | 'excentrique'
  blocks: SessionBlock[]
}

export type WeekPlan = {
  week: number
  sessions: Session[]
}

export type ProgramPlan = {
  level: number
  cycleWeeks: number
  weeks: WeekPlan[]
}

function buildInclineLowWeek(week: number, adj: ProgramAdjustment): WeekPlan {
  const baseSets = adj.volume === 'reduced' ? 3 : 4
  const baseReps = adj.volume === 'reduced' ? 8 : 8
  const excentriqueReps = adj.volume === 'reduced' ? 4 : 6

  const progressionFactor = week <= 2 ? 0 : week <= 4 ? 1 : week <= 6 ? 2 : 3

  const sets = baseSets + (progressionFactor >= 2 ? 1 : 0)
  const reps = baseReps + (progressionFactor >= 1 ? 1 : 0)

  const inclineLabel = adj.incline === 'higher' ? 'appui plus haut (tableau, barres)' : 'appui incliné stable (planche, rebord solide)'

  const sessions: Session[] = [
    {
      title: 'Séance 1 – Mise en route',
      focus: 'technique',
      blocks: [
        {
          name: 'Préparation articulaire',
          description:
            '3 minutes de mobilité épaules/poignets et extension douce du haut du dos.',
        },
        {
          name: 'Pompes inclinées contrôlées',
          description: `Pompes inclinées sur ${inclineLabel}.`,
          sets,
          reps,
          tempo: '3-1-1 (descente lente, pause courte, montée maîtrisée)',
          restSeconds: adj.restSeconds,
        },
        {
          name: 'Gainage en fin de séance',
          description: 'Gainage en appui sur les avant-bras, 2×30 secondes.',
        },
      ],
    },
    {
      title: 'Séance 2 – Contrôle excentrique',
      focus: 'excentrique',
      blocks: [
        {
          name: 'Préparation articulaire',
          description: '3 minutes de mobilisation douce épaules et poignets.',
        },
        {
          name: 'Pompes excentriques inclinées',
          description:
            `Pompes inclinées avec descente très lente sur ${inclineLabel}, remontée naturelle.`,
          sets: baseSets,
          reps: excentriqueReps,
          tempo: '4-0-1 (descente très lente, remontée contrôlée)',
          restSeconds: adj.restSeconds,
        },
        {
          name: 'Posture du haut du corps',
          description:
            '1 minute d’extension thoracique au mur, 1 minute de serrage contrôlé des omoplates.',
        },
      ],
    },
    {
      title: 'Séance 3 – Volume tolérable',
      focus: 'volume',
      blocks: [
        {
          name: 'Préparation articulaire',
          description: '3 minutes de mobilité générale.',
        },
        {
          name: 'Série longue en appui incliné',
          description:
            `Pompes inclinées sur ${inclineLabel}, volume un peu plus long à un niveau confortable.`,
          sets: baseSets,
          reps: adj.volume === 'reduced' ? baseReps : reps,
          tempo: '2-0-1 (descente maîtrisée, montée fluide)',
          restSeconds: adj.restSeconds,
        },
        {
          name: 'Gainage actif',
          description: 'Gainage en appui mains, 2×30 secondes.',
        },
      ],
    },
  ]

  return { week, sessions }
}

export function buildProgramPlan(adj: ProgramAdjustment): ProgramPlan {
  if (adj.level !== 3) {
    return {
      level: adj.level,
      cycleWeeks: adj.cycleWeeks,
      weeks: [],
    }
  }

  const weeks: WeekPlan[] = []
  for (let w = 1; w <= adj.cycleWeeks; w++) {
    weeks.push(buildInclineLowWeek(w, adj))
  }

  return {
    level: adj.level,
    cycleWeeks: adj.cycleWeeks,
    weeks,
  }
}

export function getSessionOfDay(adj: ProgramAdjustment, plan: ProgramPlan, date: Date = new Date()): Session | null {
  if (plan.weeks.length === 0) return null

  const dayIndex = date.getDay() // 0-6, 0 = dimanche
  const sessionIndex = dayIndex === 0 ? 0 : dayIndex >= 1 && dayIndex <= 4 ? 0 : dayIndex === 5 ? 1 : 2

  const weekNumber = 1 // pour l’instant on reste sur la semaine 1
  const week = plan.weeks.find(w => w.week === weekNumber)
  if (!week) return null

  return week.sessions[sessionIndex] || null
}
