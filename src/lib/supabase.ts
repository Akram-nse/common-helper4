import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hqvipwjgtismmrlzguyg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxdmlwd2pndGlzbW1ybHpndXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDQ3ODgsImV4cCI6MjA1NTg4MDc4OH0.6dZZ6yvtD5uH0BQqHSfMhmVbsXXY9FCks3wRXpTm7EU'

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
}) 