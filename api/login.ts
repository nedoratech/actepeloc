import { withCors } from "../src/api/middleware/index.js";
import { supabaseAuthRegistry } from "../src/api/registries/index.js";
import { loginRequestValidator } from "../src/api/validators/index.js";
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

  const validation = await loginRequestValidator.validate(req.body);
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

  const result = await supabaseAuthRegistry.login(validation.data);

  if (result.error) {
    if (result.error.code === "INVALID_CREDENTIALS") {
      const response: ApiResponse = {
        success: false,
        error: {
          context: [
            {
              code: "INVALID_CREDENTIALS",
              message: "Invalid email or password",
            },
          ],
        },
      };
      res.status(401).json(response);
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
            code: "LOGIN_FAILED",
            message: "Failed to login",
          },
        ],
      },
    };
    res.status(500).json(response);
    return;
  }

  const response: ApiResponse<LoginSuccessData> = {
    success: true,
    data: {
      user: {
        id: result.data.user.id,
        email: result.data.user.email,
        createdAt: result.data.user.createdAt,
      },
      session: {
        accessToken: result.data.session.accessToken,
        refreshToken: result.data.session.refreshToken,
      },
      message: "Login successful",
    },
  };
  res.status(200).json(response);
}

type LoginSuccessData = {
  user: {
    id: string;
    email: string;
    createdAt: string;
  };
  session: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
};

export default withCors(handler);
