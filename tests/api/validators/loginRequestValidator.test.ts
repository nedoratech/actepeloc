import type { LoginRequest } from "../../../src/api/registries";
import { loginRequestValidator } from "../../../src/api/validators/index.js";
import { loginRequestBuilder } from "../../builders/loginRequestBuilder.js";

describe("loginRequestValidator", () => {
  it("should fail when email is invalid", async () => {
    const invalidEmailRequest = loginRequestBuilder.valid({ email: "invalid-email" });

    var result = await runLoginRequestValidator(invalidEmailRequest);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe("email");
    expect(result.errors[0].message).toBe("Invalid email address");
  });

  it("should fail when email is empty", async () => {
    const invalidEmailRequest = loginRequestBuilder.valid({ email: "" });

    var result = await runLoginRequestValidator(invalidEmailRequest);

    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(
      result.errors.some(
        (error) => error.field === "email" && error.message === "Email cannot be empty"
      )
    ).toBe(true);
  });

  it("should fail when password is empty", async () => {
    const invalidPasswordRequest = loginRequestBuilder.valid({ password: "" });

    var result = await runLoginRequestValidator(invalidPasswordRequest);

    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(
      result.errors.some(
        (error) => error.field === "password" && error.message === "Password is required"
      )
    ).toBe(true);
  });

  it("should pass with valid login request", async () => {
    const validRequest = loginRequestBuilder.valid();

    var result = await runLoginRequestValidator(validRequest);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validRequest);
  });

  it("should fail when both email and password are empty", async () => {
    const invalidRequest = loginRequestBuilder.valid({ email: "", password: "" });

    var result = await runLoginRequestValidator(invalidRequest);

    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(2);
    expect(
      result.errors.some(
        (error) => error.field === "email" && error.message === "Email cannot be empty"
      )
    ).toBe(true);
    expect(
      result.errors.some(
        (error) => error.field === "password" && error.message === "Password is required"
      )
    ).toBe(true);
  });
});

const runLoginRequestValidator = async (request: LoginRequest) => {
  var result = await loginRequestValidator.validate(request);
  return result as {
    success: boolean;
    data: LoginRequest | undefined;
    errors: { field: string; message: string }[];
  };
};
