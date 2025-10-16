import { ApiResponseWithoutData } from "./apiResponseWithoutData.js";
import { ApiResponseWithData } from "./apiResponseWithData.js";

export type ApiResponse<T = never> = [T] extends [never]
  ? ApiResponseWithoutData
  : ApiResponseWithData<T>;
