import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// CSS files are loaded from public via <link> tags in index.html

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
