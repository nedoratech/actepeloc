import { SupabaseClient } from "@supabase/supabase-js";

export const mockSupabaseClient = {
  auth: {
    admin: {
      createUser: jest.fn(),
      signOut: jest.fn(),
    },
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
    verifyOtp: jest.fn(),
    resetPasswordForEmail: jest.fn(),
  },
} as any;
