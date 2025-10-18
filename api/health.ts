import type { VercelRequest, VercelResponse } from "@vercel/node";
import { withCors } from "../src/api/middleware/index.js";
import { config } from "../src/api/configuration/index.js";
import { validator } from "../src/api/configuration/utils/validator.js";

async function handler(req: VercelRequest, res: VercelResponse) {
  const requiredConfig = [
    "supabase.url",
    "supabase.key",
    "supabase.serviceRoleKey",
    "proxy.apiKey",
    "proxy.allowedOrigins",
  ];

  try {
    validator.validateConfig(requiredConfig);

    return res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
    });
  } catch (error) {
    console.error("Configuration validation failed:", error);

    return res.status(500).json({
      status: "error",
      timestamp: new Date().toISOString(),
      error: "Service configuration is invalid or incomplete",
    });
  }
}

export default withCors(handler);
