import type { VercelRequest, VercelResponse } from "@vercel/node";
import { config } from "../configuration/index.js";

type Handler = (req: VercelRequest, res: VercelResponse) => Promise<any>;

export function withCors(handler: Handler) {
  return async (req: VercelRequest, res: VercelResponse) => {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || apiKey !== config.proxy.apiKey) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
        code: "UNAUTHORIZED",
      });
    }

    const origin = req.headers.origin;
    const allowedOrigins = config.proxy.allowedOrigins;

    if (allowedOrigins.length > 0) {
      if (!origin || !allowedOrigins.includes(origin)) {
        return res.status(403).json({
          success: false,
          error: "Forbidden",
          code: "FORBIDDEN",
        });
      }

      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-key");
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    return await handler(req, res);
  };
}
