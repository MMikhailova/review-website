import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (import.meta.env.PROD) disableReactDevTools;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
