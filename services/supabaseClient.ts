import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables safely, casting import.meta to any to avoid type errors
// This fixes the "Property 'env' does not exist on type 'ImportMeta'" error
const env = (import.meta as any).env;
const supabaseUrl = env?.VITE_SUPABASE_URL || '';
const supabaseKey = env?.VITE_SUPABASE_KEY || '';

// Fallback to dummy values to prevent app crash if keys are missing
const url = supabaseUrl.length > 0 ? supabaseUrl : 'https://placeholder-project.supabase.co';
const key = supabaseKey.length > 0 ? supabaseKey : 'placeholder-key';

export const supabase = createClient(url, key);