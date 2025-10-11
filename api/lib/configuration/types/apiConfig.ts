import { SupabaseConfig } from "./supabase.js";

export interface ApiConfig {
  supabase: SupabaseConfig;
  nodeEnv: string;
}
