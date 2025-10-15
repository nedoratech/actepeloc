import { SignupRequest } from "../../src/api/registries";

const valid = (modify?: Partial<SignupRequest>): SignupRequest => {
  let signupRequest: SignupRequest = {
    email: "test@test.com",
    password: "Password#1",
    confirmPassword: "Password#1",
    firstName: "John",
    lastName: "Doe",
  };

  if (modify) {
    signupRequest = { ...signupRequest, ...modify };
  }

  return signupRequest;
};

export const signupRequestBuilder = { valid };
