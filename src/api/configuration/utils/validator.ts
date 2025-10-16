import { config } from "../config.js";

export function validateConfig(requiredVars: string[]) {
  const missing = requiredVars.filter((path) => {
    const value = path.split(".").reduce((obj: any, key) => obj?.[key], config);
    return !value;
  });

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

export const validator = { validateConfig };
