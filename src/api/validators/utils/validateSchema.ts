import * as yup from "yup";
import { ValidationResult } from "../types/validationResult.js";

export async function validateSchema<T extends yup.AnyObject>(
  schema: yup.ObjectSchema<T>,
  data: unknown
): Promise<ValidationResult<T>> {
  try {
    const validatedData = await schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { success: true, data: validatedData as T };
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
