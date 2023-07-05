import React from "react";
import "./index.css";
import App from "./components/App/App";

import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
