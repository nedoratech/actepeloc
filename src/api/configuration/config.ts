import type { ApiConfig } from "./types/index.js";

export const config: ApiConfig = {
  supabase: {
    url: process.env.SUPABASE_URL || "",
    key: process.env.SUPABASE_API_KEY || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },
  proxy: {
    apiKey: process.env.PROXY_API_KEY || "",
    allowedOrigins: process.env.PROXY_ALLOWED_ORIGINS?.split(",") || [],
  },
  nodeEnv: process.env.NODE_ENV || "",
} as const;
