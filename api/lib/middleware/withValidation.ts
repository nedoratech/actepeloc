import type { VercelRequest, VercelResponse } from "@vercel/node";
import { validator } from "../configuration/utils/index.js";
import { ApiConfig } from "../configuration/types/index.js";

type Handler = (req: VercelRequest, res: VercelResponse) => Promise<any>;

export function withValidation(requiredVars: (keyof ApiConfig)[], handler: Handler) {
  return async (req: VercelRequest, res: VercelResponse) => {
    try {
      validator.validateConfig(requiredVars);

      return await handler(req, res);
    } catch (error) {
      console.error("Configuration validation error:", error);

      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Configuration error",
      });
    }
  };
}
