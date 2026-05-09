import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "10px",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
            },
            success: {
              style: {
                background: "#f0fff4",
                border: "1px solid #68d391",
                color: "#276749",
              },
            },
            error: {
              style: {
                background: "#fff5f5",
                border: "1px solid #fc8181",
                color: "#c53030",
              },
            },
          }}
        />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);