import * as yup from "yup";
import type { ValidationResult } from "./types/validationResult.js";
import { validateSchema } from "./utils/index.js";
import type { SignupRequest } from "../registries/index.js";

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

async function validate(data: SignupRequest): Promise<ValidationResult<SignupRequest>> {
  return validateSchema(signupRequestSchema, data);
}

export const signupRequestValidator = { validate };
