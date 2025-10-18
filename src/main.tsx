import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";

import "./main.css";
import "./core/i18n/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
