import { User } from "./user.js";

export interface AuthResult<T = User> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}
