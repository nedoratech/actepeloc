import { ErrorResponse } from "./errorResponse.js";
import { User } from "./user.js";

export interface AuthResult<T = User> {
  data?: T;
  error?: ErrorResponse;
}
