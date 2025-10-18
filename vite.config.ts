import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // bind to all addresses so the server is reachable from the host when running inside a devcontainer
    host: true, // same as '0.0.0.0'
    port: 5173,
    // Explicit HMR settings help when running inside a devcontainer or remote environment.
    // If you're running `yarn dev:host` (which passes --host), Vite needs the client to connect
    // back to the correct address. We prefer using environment variables when available.
    hmr: {
      // Use VITE_HMR_HOST if set, otherwise fallback to the dev server host when available.
      host: process.env.VITE_HMR_HOST || process.env.HOST || "localhost",
      // When running in some remote setups you might need to expose a client port.
      clientPort: Number(process.env.VITE_HMR_CLIENT_PORT || 5173),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
