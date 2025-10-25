import type { Config } from "./types";

const nodeEnv = import.meta.env.MODE || "development";

export const config: Config = {
  apiProxy: {
    apiKey: import.meta.env.VITE_PROXY_API_KEY || "",
    baseUrl: import.meta.env.VITE_API_BASE_URL || "/api",
  },
  nodeEnv,
  isDevelopment: nodeEnv === "development",
  isProduction: nodeEnv === "production",
} as const;
