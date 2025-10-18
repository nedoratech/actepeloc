import { withCors } from "../src/api/middleware/index.js";
import { supabaseAuthRegistry } from "../src/api/registries/index.js";
import { signupRequestValidator } from "../src/api/validators/index.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { ApiResponse } from "../src/api/types/index.js";

async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    const response: ApiResponse = {
      success: false,
      error: {
        context: [{ code: "METHOD_NOT_ALLOWED", message: "Method not allowed" }],
      },
    };
    res.status(405).json(response);
    return;
  }

  const validation = await signupRequestValidator.validate(req.body);
  if (!validation.success) {
    const response: ApiResponse = {
      success: false,
      error: {
        context: validation.errors,
      },
    };
    res.status(400).json(response);
    return;
  }

  const result = await supabaseAuthRegistry.signup(validation.data);

  if (result.error) {
    if (result.error.code === "USER_ALREADY_EXISTS") {
      const response: ApiResponse = {
        success: false,
        error: {
          context: [
            {
              code: "USER_ALREADY_EXISTS",
              message: "A user with this email already exists",
            },
          ],
        },
      };
      res.status(400).json(response);
      return;
    }

    const response: ApiResponse = {
      success: false,
      error: {
        context: [
          {
            code: result.error.code || "AUTH_ERROR",
            message: result.error.message,
          },
        ],
      },
    };
    res.status(500).json(response);
    return;
  }

  if (!result.data) {
    const response: ApiResponse = {
      success: false,
      error: {
        context: [
          {
            code: "USER_CREATION_FAILED",
            message: "Failed to create user",
          },
        ],
      },
    };
    res.status(500).json(response);
    return;
  }

  const response: ApiResponse<SignupSuccessData> = {
    success: true,
    data: {
      user: {
        id: result.data.id,
        email: result.data.email,
        createdAt: result.data.createdAt,
      },
      message: "User created successfully",
    },
  };
  res.status(201).json(response);
}

type SignupSuccessData = {
  user: {
    id: string;
    email: string;
    createdAt: string;
  };
  message: string;
};

export default withCors(handler);
