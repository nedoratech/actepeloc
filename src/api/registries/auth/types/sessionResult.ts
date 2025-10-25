import type { SessionResponse } from "./sessionResponse.js";
import type { ErrorResponse } from "./errorResponse.js";
import type { User } from "./user.js";

export interface SessionResult {
  data?: {
    user: User;
    session: SessionResponse;
  };
  error?: ErrorResponse;
}
