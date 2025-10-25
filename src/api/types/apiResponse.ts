import type { ApiResponseWithoutData } from "./apiResponseWithoutData.js";
import type { ApiResponseWithData } from "./apiResponseWithData.js";

export type ApiResponse<T = never> = [T] extends [never]
  ? ApiResponseWithoutData
  : ApiResponseWithData<T>;
