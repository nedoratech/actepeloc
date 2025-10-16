import { SupabaseAuthRegistry } from "../../../src/api/registries/auth/providers/supabase/supabaseAuthRegistry.js";
import { signupRequestBuilder } from "../../builders/signupRequestBuilder.js";
import { loginRequestBuilder } from "../../builders/loginRequestBuilder.js";
import { mockSupabaseClient } from "../../mocks/supabaseClientMock.js";

describe("supabaseAuthRegistry", () => {
  let authRegistry: SupabaseAuthRegistry;

  beforeEach(() => {
    authRegistry = new SupabaseAuthRegistry(mockSupabaseClient);
    jest.clearAllMocks();
  });

  describe("signup", () => {
    it("should create a new user successfully", async () => {
      const signupRequest = signupRequestBuilder.valid();
      const mockUser = {
        id: "test-user-id",
        email: signupRequest.email,
        created_at: "2023-01-01T00:00:00Z",
      };

      mockSupabaseClient.auth.admin.createUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const result = await authRegistry.signup(signupRequest);

      expect(result.data).toBeDefined();
      expect(result.data?.id).toBe("test-user-id");
      expect(result.data?.email).toBe(signupRequest.email);
      expect(result.data?.createdAt).toBe("2023-01-01T00:00:00Z");
      expect(result.error).toBeUndefined();

      expect(mockSupabaseClient.auth.admin.createUser).toHaveBeenCalledWith({
        email: signupRequest.email,
        password: signupRequest.password,
        email_confirm: true,
        user_metadata: {
          first_name: signupRequest.firstName,
          last_name: signupRequest.lastName,
        },
      });
    });

    it("should handle signup errors", async () => {
      const signupRequest = signupRequestBuilder.valid();
      const mockError = {
        message: "Email already exists",
      };

      mockSupabaseClient.auth.admin.createUser.mockResolvedValue({
        data: { user: null },
        error: mockError,
      });

      const result = await authRegistry.signup(signupRequest);

      expect(result.data).toBeUndefined();
      expect(result.error).toBeDefined();
      expect(result.error?.message).toBe("Email already exists");
    });

    it("should handle missing user data", async () => {
      const signupRequest = signupRequestBuilder.valid();

      mockSupabaseClient.auth.admin.createUser.mockResolvedValue({
        data: { user: null },
        error: null,
      });

      const result = await authRegistry.signup(signupRequest);

      expect(result.data).toBeUndefined();
      expect(result.error).toBeDefined();
      expect(result.error?.message).toBe("Failed to create user");
      expect(result.error?.code).toBe("USER_CREATION_FAILED");
    });

    it("should handle unexpected errors", async () => {
      const signupRequest = signupRequestBuilder.valid();

      mockSupabaseClient.auth.admin.createUser.mockRejectedValue(new Error("Network error"));

      const result = await authRegistry.signup(signupRequest);

      expect(result.data).toBeUndefined();
      expect(result.error).toBeDefined();
      expect(result.error?.message).toBe("Network error");
      expect(result.error?.code).toBe("INTERNAL_ERROR");
    });
  });

  describe("login", () => {
    it("should login user successfully", async () => {
      const loginRequest = loginRequestBuilder.valid();
      const mockUser = {
        id: "test-user-id",
        email: loginRequest.email,
        created_at: "2023-01-01T00:00:00Z",
      };
      const mockSession = {
        access_token: "test-access-token",
        refresh_token: "test-refresh-token",
      };

      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });

      const result = await authRegistry.login(loginRequest);

      expect(result.data).toBeDefined();
      expect(result.data?.user.id).toBe("test-user-id");
      expect(result.data?.user.email).toBe(loginRequest.email);
      expect(result.data?.session.accessToken).toBe("test-access-token");
      expect(result.data?.session.refreshToken).toBe("test-refresh-token");
      expect(result.error).toBeUndefined();

      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: loginRequest.email,
        password: loginRequest.password,
      });
    });

    it("should handle login errors", async () => {
      const loginRequest = loginRequestBuilder.valid();
      const mockError = {
        message: "Invalid credentials",
      };

      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: mockError,
      });

      const result = await authRegistry.login(loginRequest);

      expect(result.data).toBeUndefined();
      expect(result.error).toBeDefined();
      expect(result.error?.message).toBe("Invalid credentials");
    });

    it("should handle missing user or session", async () => {
      const loginRequest = loginRequestBuilder.valid();

      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: null,
      });

      const result = await authRegistry.login(loginRequest);

      expect(result.data).toBeUndefined();
      expect(result.error).toBeDefined();
      expect(result.error?.message).toBe("Failed to authenticate");
      expect(result.error?.code).toBe("AUTH_FAILED");
    });

    it("should handle unexpected errors during login", async () => {
      const loginRequest = loginRequestBuilder.valid();

      mockSupabaseClient.auth.signInWithPassword.mockRejectedValue(new Error("Network error"));

      const result = await authRegistry.login(loginRequest);

      expect(result.data).toBeUndefined();
      expect(result.error).toBeDefined();
      expect(result.error?.message).toBe("Network error");
      expect(result.error?.code).toBe("INTERNAL_ERROR");
    });
  });

  describe("logout", () => {
    it("should logout user successfully", async () => {
      const accessToken = "test-access-token";

      mockSupabaseClient.auth.admin.signOut.mockResolvedValue({
        error: null,
      });

      const result = await authRegistry.logout(accessToken);

      expect(result.error).toBeUndefined();
      expect(mockSupabaseClient.auth.admin.signOut).toHaveBeenCalledWith(accessToken);
    });

    it("should handle logout errors", async () => {
      const accessToken = "test-access-token";
      const mockError = {
        message: "Invalid token",
      };

      mockSupabaseClient.auth.admin.signOut.mockResolvedValue({
        error: mockError,
      });

      const result = await authRegistry.logout(accessToken);

      expect(result.error).toBeDefined();
      expect(result.error?.message).toBe("Invalid token");
    });

    it("should handle unexpected errors during logout", async () => {
      const accessToken = "test-access-token";

      mockSupabaseClient.auth.admin.signOut.mockRejectedValue(new Error("Network error"));

      const result = await authRegistry.logout(accessToken);

      expect(result.error).toBeDefined();
      expect(result.error?.message).toBe("Network error");
    });
  });
});
