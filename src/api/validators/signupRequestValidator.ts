import * as yup from "yup";
import { ValidationResult } from "./types/validationResult.js";

const signupRequestSchema = yup.object({
  email: yup.string().required("Email cannot be empty").email("Invalid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),

  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),

  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
});

type SignupRequestValidated = yup.InferType<typeof signupRequestSchema>;

async function validate(data: unknown): Promise<ValidationResult<SignupRequestValidated>> {
  try {
    const validatedData = await signupRequestSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { success: true, data: validatedData };
  } catch (error) {
    if (error && typeof error === "object" && "name" in error && error.name === "ValidationError") {
      const validationError = error as unknown as {
        inner: Array<{ path?: string; message: string }>;
      };
      return {
        success: false,
        errors: validationError.inner.map((err) => ({
          field: err.path || "unknown",
          message: err.message,
        })),
      };
    }
    throw error;
  }
}

export const signupRequestValidator = { validate };
