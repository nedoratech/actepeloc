import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    // bind to all addresses so the server is reachable from the host when running inside a devcontainer
    host: true, // same as '0.0.0.0'
    port: 5173,
  },
});
