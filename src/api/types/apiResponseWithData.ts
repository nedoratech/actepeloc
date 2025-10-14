import { ErrorContext } from "./errorContext.js";

export type ApiResponseWithData<T> = {
  success: boolean;
  data: T | null;
  error?: ErrorContext;
};
