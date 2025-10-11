import { config } from "../config.js";
import { ApiConfig } from "../types/index.js";

export function validateConfig(requiredVars: (keyof ApiConfig)[]) {
  const missing = requiredVars.filter((key) => !config[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

export const validator = { validateConfig };
