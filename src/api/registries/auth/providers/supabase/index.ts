import { config } from "../../../../configuration/config.js";
import { createClient } from "@supabase/supabase-js";
import type { IAuthRegistry } from "../../index.js";
import { SupabaseAuthRegistry } from "./supabaseAuthRegistry.js";

const supabaseClient = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export const supabaseAuthRegistry: IAuthRegistry = new SupabaseAuthRegistry(supabaseClient);
