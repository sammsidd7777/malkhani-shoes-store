import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3200,
        style: {
          background: "#131316",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "9999px",
          padding: "10px 18px",
          fontSize: "13px",
          fontWeight: 600,
          boxShadow: "0 10px 30px -12px rgba(0,0,0,0.6)",
        },
        success: { iconTheme: { primary: "#c5a059", secondary: "#0b0b0d" } },
        error: { iconTheme: { primary: "#ef4444", secondary: "#0b0b0d" } },
      }}
    />
    <App />
  </StrictMode>
);
