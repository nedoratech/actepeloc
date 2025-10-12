import { VercelRequest, VercelResponse } from "@vercel/node";

export type Handler = (req: VercelRequest, res: VercelResponse) => Promise<any>;
