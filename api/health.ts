import type { VercelRequest, VercelResponse } from "@vercel/node";
import { withValidation } from "./lib/middleware/withValidation.js";
import { config } from "./lib/configuration/index.js";

async function handler(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
}

export default withValidation(["supabaseUrl", "supabaseKey"], handler);
