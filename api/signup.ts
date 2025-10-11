import type { VercelRequest, VercelResponse } from "@vercel/node";
import { withValidation } from "./lib/middleware/withValidation.js";
import { supabaseAdmin } from "./lib/supabase/index.js";
import { validators } from "./lib/validation/index.js";
import { SignupRequest, SignupResponse } from "./lib/types/index.js";

async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({
      success: false,
      error: "Method not allowed",
      code: "METHOD_NOT_ALLOWED",
    });
    return;
  }

  try {
    const body = req.body as SignupRequest;

    const validation = validators.validateSignupRequest(body);
    if (!validation.valid) {
      res.status(400).json({
        success: false,
        error: validation.errors.join(", "),
        code: "VALIDATION_ERROR",
      } as SignupResponse);
      return;
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true, // Auto-confirm email (change to false if you want email verification)
      user_metadata: {
        full_name: body.full_name || body.email.split("@")[0],
      },
    });

    if (error) {
      console.error("Supabase auth error:", error);

      if (error.message.includes("already registered")) {
        res.status(400).json({
          success: false,
          error: "A user with this email already exists",
          code: "USER_ALREADY_EXISTS",
        } as SignupResponse);
        return;
      }

      res.status(500).json({
        success: false,
        error: error.message,
        code: "AUTH_ERROR",
      } as SignupResponse);
      return;
    }

    if (!data.user) {
      res.status(500).json({
        success: false,
        error: "Failed to create user",
        code: "USER_CREATION_FAILED",
      } as SignupResponse);
      return;
    }

    res.status(201).json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email!,
        created_at: data.user.created_at,
      },
      message: "User created successfully",
    } as SignupResponse);
  } catch (error) {
    console.error("Unexpected error during signup:", error);

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
      code: "INTERNAL_ERROR",
    } as SignupResponse);
  }
}

export default withValidation(["supabase.url", "supabase.key", "supabase.serviceRoleKey"], handler);
