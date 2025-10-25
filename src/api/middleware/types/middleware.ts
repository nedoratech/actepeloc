import type { Handler } from "./handler.js";

export type Middleware = (handler: Handler) => Handler;
