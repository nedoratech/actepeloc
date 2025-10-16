import type { SignupRequest } from "../../../src/api/registries";
import { signupRequestValidator } from "../../../src/api/validators/index.js";
import { signupRequestBuilder } from "../../builders/signupRequestBuilder.js";

describe("signupRequestSchema", () => {
  it("should fail when invalid email is provided", async () => {
    const invalidEmailRequest = signupRequestBuilder.valid({ email: "invalid-email" });

    var result = await runSignupRequestValidator(invalidEmailRequest);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe("email");
    expect(result.errors[0].message).toBe("Invalid email address");
  });

  it("should fail when email is empty", async () => {
    const invalidEmailRequest = signupRequestBuilder.valid({ email: "" });

    var result = await runSignupRequestValidator(invalidEmailRequest);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe("email");
    expect(result.errors[0].message).toBe("Email cannot be empty");
  });

  it("should fail when password is empty", async () => {
    const invalidPasswordRequest = signupRequestBuilder.valid({ password: "" });

    var result = await runSignupRequestValidator(invalidPasswordRequest);

    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(
      result.errors.some(
        (error) => error.field === "password" && error.message === "Password is required"
      )
    ).toBe(true);
  });

  it("should fail when password is less than 8 characters", async () => {
    const invalidPasswordRequest = signupRequestBuilder.valid({
      password: "Pass1",
      confirmPassword: "Pass1",
    });

    var result = await runSignupRequestValidator(invalidPasswordRequest);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe("password");
    expect(result.errors[0].message).toBe("Password must be at least 8 characters");
  });

  it("should fail when password does not contain at least one uppercase letter", async () => {
    const invalidPasswordRequest = signupRequestBuilder.valid({
      password: "password123",
      confirmPassword: "password123",
    });

    var result = await runSignupRequestValidator(invalidPasswordRequest);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe("password");
    expect(result.errors[0].message).toBe("Password must contain at least one uppercase letter");
  });

  it("should fail when password does not contain at least one lowercase letter", async () => {
    const invalidPasswordRequest = signupRequestBuilder.valid({
      password: "PASSWORD123",
      confirmPassword: "PASSWORD123",
    });

    var result = await runSignupRequestValidator(invalidPasswordRequest);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe("password");
    expect(result.errors[0].message).toBe("Password must contain at least one lowercase letter");
  });

  it("should fail when password does not contain at least one number", async () => {
    const invalidPasswordRequest = signupRequestBuilder.valid({
      password: "Password",
      confirmPassword: "Password",
    });

    var result = await runSignupRequestValidator(invalidPasswordRequest);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe("password");
    expect(result.errors[0].message).toBe("Password must contain at least one number");
  });

  it("should fail when confirm password is empty", async () => {
    const invalidConfirmPasswordRequest = signupRequestBuilder.valid({ confirmPassword: "" });

    var result = await runSignupRequestValidator(invalidConfirmPasswordRequest);

    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(
      result.errors.some(
        (error) =>
          error.field === "confirmPassword" &&
          (error.message === "Confirm password is required" ||
            error.message === "Passwords must match")
      )
    ).toBe(true);
  });

  it("should fail when confirm password does not match password", async () => {
    const invalidConfirmPasswordRequest = signupRequestBuilder.valid({
      confirmPassword: "Password123",
    });

    var result = await runSignupRequestValidator(invalidConfirmPasswordRequest);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe("confirmPassword");
    expect(result.errors[0].message).toBe("Passwords must match");
  });

  it("should fail when first name is empty", async () => {
    const invalidFirstNameRequest = signupRequestBuilder.valid({ firstName: "" });

    var result = await runSignupRequestValidator(invalidFirstNameRequest);

    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(
      result.errors.some(
        (error) => error.field === "firstName" && error.message === "First name is required"
      )
    ).toBe(true);
  });

  it("should fail when first name is less than 2 characters", async () => {
    const invalidFirstNameRequest = signupRequestBuilder.valid({ firstName: "A" });

    var result = await runSignupRequestValidator(invalidFirstNameRequest);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe("firstName");
    expect(result.errors[0].message).toBe("First name must be at least 2 characters");
  });

  it("should fail when last name is empty", async () => {
    const invalidLastNameRequest = signupRequestBuilder.valid({ lastName: "" });

    var result = await runSignupRequestValidator(invalidLastNameRequest);

    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(
      result.errors.some(
        (error) => error.field === "lastName" && error.message === "Last name is required"
      )
    ).toBe(true);
  });

  it("should fail when last name is less than 2 characters", async () => {
    const invalidLastNameRequest = signupRequestBuilder.valid({ lastName: "A" });

    var result = await runSignupRequestValidator(invalidLastNameRequest);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe("lastName");
    expect(result.errors[0].message).toBe("Last name must be at least 2 characters");
  });
});

const runSignupRequestValidator = async (request: SignupRequest) => {
  var result = await signupRequestValidator.validate(request);
  return result as {
    success: boolean;
    data: SignupRequest | undefined;
    errors: { field: string; message: string }[];
  };
};
