/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (supabaseUrl) {
  // Rimuovi eventuali spazi o slash finali
  supabaseUrl = supabaseUrl.trim().replace(/\/$/, '');
  // Aggiungi https:// se l'utente l'ha dimenticato
  if (!supabaseUrl.startsWith('http')) {
    supabaseUrl = `https://${supabaseUrl}`;
  }
}

if (supabaseAnonKey) {
  supabaseAnonKey = supabaseAnonKey.trim();
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("ATTENZIONE: VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY mancanti. Controlla i Secrets in AI Studio.");
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);
