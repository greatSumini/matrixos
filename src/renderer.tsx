import { createRoot } from "react-dom/client";
import { AppRouter } from "./renderer/app/Router";
import "./renderer/styles/global.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(<AppRouter />);
