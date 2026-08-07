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
    title: level === 1 ? 'Fondations : Appui Mur' : level === 2 ? 'Incliné Haut' : level === 3 ? 'Incliné Bas' : level === 4 ? 'Force Excentrique' : 'Pompe Stricte',
    goal: profile.fitness_goal || 'Force et progression sans douleur',
    frequency: 3,
    cycleWeeks: 8,
    bmi,
    volume: reducedVolume ? 'reduced' : 'standard',
    restSeconds: veryHighBmi || pain ? 120 : 90,
    incline: veryHighBmi ? 'higher' : 'standard',
  }
}