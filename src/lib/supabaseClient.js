import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fallback if credentials not configured
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_') || supabaseAnonKey.includes('paste_')) {
  console.warn('Supabase credentials not configured. Using demo mode.')
}

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your_') && !supabaseAnonKey.includes('paste_')
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined
      }
    })
  : null
