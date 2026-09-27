import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer } from 'react-toastify';
import "./index.css";
import App from "./App.jsx";
import Contaxt from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Contaxt>
    <App />
    <ToastContainer />
  </Contaxt>
  </BrowserRouter>,
);
