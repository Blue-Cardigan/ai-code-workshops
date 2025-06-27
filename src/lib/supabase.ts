import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface AssessmentSubmission {
  id?: string
  created_at?: string
  company_size: string
  interests: string
  roles: string[]
  training_preference: string
  in_person_hosting?: string
  company_name: string
  contact_name: string
  email: string
  phone?: string
  additional_notes?: string
  recommended_track: string 
  team_size?: string
  quote_value?: number
} 