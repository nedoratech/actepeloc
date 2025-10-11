import { SignupRequest } from "../types/index.js";
import { ValidationResult } from "./types/index.js";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[a-zA-Z]/.test(password)) {
    errors.push("Password must contain at least one letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

const validateSignupRequest = (data: SignupRequest): ValidationResult => {
  const errors: string[] = [];

  if (!data.email) {
    errors.push("Email is required");
  } else if (typeof data.email !== "string") {
    errors.push("Email must be a string");
  } else if (!validateEmail(data.email)) {
    errors.push("Invalid email format");
  }

  if (!data.password) {
    errors.push("Password is required");
  } else if (typeof data.password !== "string") {
    errors.push("Password must be a string");
  } else {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      errors.push(...passwordValidation.errors);
    }
  }

  if (data.full_name !== undefined && typeof data.full_name !== "string") {
    errors.push("Full name must be a string");
  }

  if (data.full_name && data.full_name.length > 100) {
    errors.push("Full name must be less than 100 characters");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validators = {
  validateEmail,
  validatePassword,
  validateSignupRequest,
};
