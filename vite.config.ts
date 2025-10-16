import tailwindcss from "@tailwindcss/vite"
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
  },
  resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
},
});
