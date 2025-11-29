import { createClient } from '@supabase/supabase-js';

// These process.env variables are injected by vite.config.ts
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_KEY || '';

// Fallback to dummy values to prevent app crash if keys are missing
const url = supabaseUrl.length > 0 ? supabaseUrl : 'https://placeholder-project.supabase.co';
const key = supabaseKey.length > 0 ? supabaseKey : 'placeholder-key';

export const supabase = createClient(url, key);