import { createClient } from '@supabase/supabase-js'


const supabase = createClient(import.meta.env.VITE_SP_URL, import.meta.env.VITE_SP_KEY);

export default supabase;