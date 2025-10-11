import { User } from "./user.js";

export interface SignupResponse {
  success: boolean;
  user?: User;
  message?: string;
  error?: string;
  code?: string;
}
