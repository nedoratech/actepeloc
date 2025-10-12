import type { ProxyConfig } from "./proxyConfig.js";
import type { SupabaseConfig } from "./supabase.js";

export interface ApiConfig {
  supabase: SupabaseConfig;
  proxy: ProxyConfig;
  nodeEnv: string;
}
