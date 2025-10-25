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
    // When running inside devcontainers or some remote environments, filesystem
    // watchers may not trigger. Enable polling as a robust fallback.
    watch: {
      usePolling: true,
      // interval in milliseconds. 100ms is a reasonable default without being too noisy.
      interval: 100,
    },
    // Explicit HMR settings help when running inside a devcontainer or remote environment.
    // If you're running `yarn dev:host` (which passes --host), Vite needs the client to connect
    // back to the correct address. We prefer using environment variables when available.
    hmr: {
      // Use VITE_HMR_HOST if set, otherwise fallback to the dev server host when available.
      // When running in a container, binding to 0.0.0.0 helps the HMR client connect
      // through forwarded ports.
      host: process.env.VITE_HMR_HOST || process.env.HOST || "0.0.0.0",
      // Explicit protocol can help in environments where secure websockets are required.
      protocol: process.env.VITE_HMR_PROTOCOL || "ws",
      // When running in some remote setups you might need to expose a client port.
      // Prefer explicit VITE_HMR_CLIENT_PORT, then VITE_PORT/PORT, finally 5173.
      clientPort: Number(
        process.env.VITE_HMR_CLIENT_PORT || process.env.VITE_PORT || process.env.PORT || 5173
      ),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
