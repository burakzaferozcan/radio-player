import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index.jsx";

createRoot(document.getElementById("root")).render(
  <Provide {...store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provide>
);
