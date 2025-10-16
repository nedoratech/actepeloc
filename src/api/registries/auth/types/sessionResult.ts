import { SessionResponse } from "./sessionResponse.js";
import { ErrorResponse } from "./errorResponse.js";
import { User } from "./user.js";

export interface SessionResult {
  data?: {
    user: User;
    session: SessionResponse;
  };
  error?: ErrorResponse;
}
