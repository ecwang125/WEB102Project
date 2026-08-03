import { createClient } from '@supabase/supabase-js'

const URL = 'https://poxacgxcbmgbqyorhjnb.supabase.co'
const API_KEY = 'sb_publishable_cTqy0NuR5f0n9TQ6wrOdtA_GpHNFRon'

export const supabase = createClient(URL, API_KEY)
