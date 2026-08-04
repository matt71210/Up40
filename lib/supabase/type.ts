export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          age: number | null
          height_cm: number | null
          weight_kg: number | null
          current_push_level: number | null
          has_pain: boolean | null
          pain_areas: string[] | null
          fitness_goal: string | null
          created_at: string
          updated_at: string
        }
      }
      programs: {
        Row: {
          id: string
          user_id: string | null
          name: string
          difficulty_level: string | null
          frequency_days: number | null
          total_weeks: number | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
      }
      workouts: {
        Row: {
          id: string
          user_id: string | null
          program_id: string | null
          workout_date: string
          completed: boolean | null
          duration_minutes: number | null
          notes: string | null
          pain_level: number | null
          created_at: string
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Program = Database['public']['Tables']['programs']['Row']
export type Workout = Database['public']['Tables']['workouts']['Row']