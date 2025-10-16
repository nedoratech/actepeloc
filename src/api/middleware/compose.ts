import { Middleware, Handler } from "./types/index.js";

export function compose(...middlewares: Middleware[]): Middleware {
  return (handler: Handler) => {
    return middlewares.reduceRight(
      (composedHandler, middleware) => middleware(composedHandler),
      handler
    );
  };
}
