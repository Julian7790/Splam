// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FavoriteProvider } from "./context/FavoriteContext";
import { AuthProvider } from "./context/AuthContext"; // if you're using auth

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <FavoriteProvider>
        <App />
      </FavoriteProvider>
    </AuthProvider>
  </React.StrictMode>
);
