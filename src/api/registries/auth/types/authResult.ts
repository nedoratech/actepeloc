import type { ErrorResponse } from "./errorResponse.js";
import type { User } from "./user.js";

export interface AuthResult<T = User> {
  data?: T;
  error?: ErrorResponse;
}
