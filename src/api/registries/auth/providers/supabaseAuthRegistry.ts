import { SupabaseClient, createClient } from "@supabase/supabase-js";
import {
  IAuthRegistry,
  SignupRequest,
  LoginRequest,
  AuthResult,
  SessionResult,
  ErrorResponse,
} from "../types/index.js";
import { config } from "../../../configuration/index.js";

class SupabaseAuthRegistry implements IAuthRegistry {
  #supabase: SupabaseClient;

  constructor() {
    this.#supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  async signup(params: SignupRequest): Promise<AuthResult> {
    try {
      const { data, error } = await this.#supabase.auth.admin.createUser({
        email: params.email,
        password: params.password,
        email_confirm: true,
        user_metadata: {
          first_name: params.firstName,
          last_name: params.lastName,
        },
      });

      if (error) {
        return {
          error: {
            message: error.message,
            code: this.mapSupabaseErrorCode(error.message),
          },
        };
      }

      if (!data.user) {
        return {
          error: {
            message: "Failed to create user",
            code: "USER_CREATION_FAILED",
          },
        };
      }

      return {
        data: {
          id: data.user.id,
          email: data.user.email!,
          created_at: data.user.created_at,
        },
      };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
          code: "INTERNAL_ERROR",
        },
      };
    }
  }

  async login(params: LoginRequest): Promise<SessionResult> {
    try {
      const { data, error } = await this.#supabase.auth.signInWithPassword({
        email: params.email,
        password: params.password,
      });

      if (error) {
        return {
          error: {
            message: error.message,
            code: this.mapSupabaseErrorCode(error.message),
          },
        };
      }

      if (!data.user || !data.session) {
        return {
          error: {
            message: "Failed to authenticate",
            code: "AUTH_FAILED",
          },
        };
      }

      return {
        data: {
          user: {
            id: data.user.id,
            email: data.user.email!,
            created_at: data.user.created_at,
          },
          session: {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          },
        },
      };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
          code: "INTERNAL_ERROR",
        },
      };
    }
  }

  async logout(accessToken: string): Promise<{ error?: ErrorResponse }> {
    try {
      const { error } = await this.#supabase.auth.admin.signOut(accessToken);

      if (error) {
        return {
          error: {
            message: error.message,
          },
        };
      }

      return {};
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
        },
      };
    }
  }

  async verifyEmail(token: string): Promise<AuthResult> {
    try {
      const { data, error } = await this.#supabase.auth.verifyOtp({
        token_hash: token,
        type: "email",
      });

      if (error) {
        return {
          error: {
            message: error.message,
            code: "VERIFICATION_FAILED",
          },
        };
      }

      if (!data.user) {
        return {
          error: {
            message: "Failed to verify email",
            code: "VERIFICATION_FAILED",
          },
        };
      }

      return {
        data: {
          id: data.user.id,
          email: data.user.email!,
          created_at: data.user.created_at,
        },
      };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
          code: "INTERNAL_ERROR",
        },
      };
    }
  }

  async resetPassword(email: string): Promise<{ error?: { message: string } }> {
    try {
      const { error } = await this.#supabase.auth.resetPasswordForEmail(email);

      if (error) {
        return {
          error: {
            message: error.message,
          },
        };
      }

      return {};
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
        },
      };
    }
  }

  private mapSupabaseErrorCode(errorMessage: string): string {
    if (errorMessage.includes("already registered")) {
      return "USER_ALREADY_EXISTS";
    }
    if (errorMessage.includes("Invalid login credentials")) {
      return "INVALID_CREDENTIALS";
    }
    if (errorMessage.includes("Email not confirmed")) {
      return "EMAIL_NOT_CONFIRMED";
    }
    return "AUTH_ERROR";
  }
}

export const supabaseAuthRegistry: IAuthRegistry = new SupabaseAuthRegistry();
