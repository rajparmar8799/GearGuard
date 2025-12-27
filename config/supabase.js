import { createClient } from "@supabase/supabase-js";

let supabaseClient = null;

export function getSupabase() {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Supabase env variables missing", {
      SUPABASE_URL: supabaseUrl,
      SUPABASE_ANON_KEY: supabaseAnonKey ? "LOADED" : "MISSING"
    });
    return null; // ❗ DO NOT THROW
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false }
  });

  return supabaseClient;
}
