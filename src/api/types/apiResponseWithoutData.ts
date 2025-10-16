import { ErrorContext } from "./errorContext.js";

export type ApiResponseWithoutData = {
  success: boolean;
  error?: ErrorContext;
};
