import { LoginRequest } from "../../src/api/registries";

const valid = (modify?: Partial<LoginRequest>): LoginRequest => {
  let loginRequest: LoginRequest = {
    email: "test@test.com",
    password: "password123",
  };

  if (modify) {
    loginRequest = { ...loginRequest, ...modify };
  }

  return loginRequest;
};

export const loginRequestBuilder = { valid };
