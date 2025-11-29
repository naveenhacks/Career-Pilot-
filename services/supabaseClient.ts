import { createClient } from '@supabase/supabase-js';

// Helper to safely access env vars in different environments (Vite, Webpack, Node)
const getEnv = (key: string) => {
  // 1. Try Vite's import.meta.env (handles VITE_ prefix)
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env[`VITE_${key}`] || import.meta.env[key];
    }
  } catch (e) {
    // ignore
  }

  // 2. Try process.env (Node/Webpack)
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key] || process.env[`REACT_APP_${key}`];
    }
  } catch (e) {
    // ignore
  }

  return '';
};

const supabaseUrl = getEnv('SUPABASE_URL');
const supabaseKey = getEnv('SUPABASE_KEY');

// Fallback to dummy values to prevent app crash if keys are missing.
// The "supabaseUrl is required" error occurs if the first argument is empty.
const url = supabaseUrl && supabaseUrl.length > 0 ? supabaseUrl : 'https://placeholder-project.supabase.co';
const key = supabaseKey && supabaseKey.length > 0 ? supabaseKey : 'placeholder-key';

export const supabase = createClient(url, key);