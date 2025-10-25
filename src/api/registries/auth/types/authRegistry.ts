import type { AuthResult } from "./authResult.js";
import type { ErrorResponse } from "./errorResponse.js";
import type { LoginRequest } from "./loginRequest.js";
import type { SessionResult } from "./sessionResult.js";
import type { SignupRequest } from "./signupRequest.js";

export interface IAuthRegistry {
  signup(params: SignupRequest): Promise<AuthResult>;
  login(params: LoginRequest): Promise<SessionResult>;
  logout(accessToken: string): Promise<{ error?: ErrorResponse }>;
  verifyEmail?(token: string): Promise<AuthResult>;
  resetPassword?(email: string): Promise<{ error?: ErrorResponse }>;
}
