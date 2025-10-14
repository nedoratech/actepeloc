import * as yup from "yup";
import { ValidationResult } from "./types/validationResult.js";
import { validateSchema } from "./utils/index.js";
import { LoginRequest } from "../registries/index.js";

const loginRequestSchema = yup.object({
  email: yup.string().required("Email cannot be empty").email("Invalid email address"),

  password: yup.string().required("Password is required"),
});

type LoginRequestValidated = yup.InferType<typeof loginRequestSchema>;

async function validate(data: LoginRequest): Promise<ValidationResult<LoginRequestValidated>> {
  return validateSchema(loginRequestSchema, data);
}

export const loginRequestValidator = { validate };
