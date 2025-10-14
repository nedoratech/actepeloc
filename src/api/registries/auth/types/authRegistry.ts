import { AuthResult } from "./authResult.js";
import { ErrorResponse } from "./errorResponse.js";
import { LoginRequest } from "./loginRequest.js";
import { SessionResult } from "./sessionResult.js";
import { SignupRequest } from "./signupRequest.js";

export interface IAuthRegistry {
  signup(params: SignupRequest): Promise<AuthResult>;
  login(params: LoginRequest): Promise<SessionResult>;
  logout(accessToken: string): Promise<{ error?: ErrorResponse }>;
  verifyEmail?(token: string): Promise<AuthResult>;
  resetPassword?(email: string): Promise<{ error?: ErrorResponse }>;
}
