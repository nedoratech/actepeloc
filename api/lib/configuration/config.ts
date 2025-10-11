import { ApiConfig } from "./types/index.js";

export const config: ApiConfig = {
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseKey: process.env.SUPABASE_API_KEY || "",
  nodeEnv: process.env.NODE_ENV || "",
} as const;
