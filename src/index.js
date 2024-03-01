import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Ball from "./pages/shakeBall";
import RefComp from "./pages/ref";
import ContextComp from "./pages/context";
import FormComp from "./pages/form";
import EffectComp from "./pages/hooks/useEffectPage";
import Imperative from "./pages/hooks/ImperativeHandle";
import RouterDemo from "./pages/router/demo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterDemo />
  </React.StrictMode>
);
