import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

import { DriverStates } from "./context/DriverContext";

createRoot(document.getElementById("root")).render(
  <DriverStates>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DriverStates>
);
