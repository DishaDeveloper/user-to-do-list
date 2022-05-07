import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/todo-list.scss";
import App from "./App";
import { data } from "./api/data";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App tasks={data} />
  </React.StrictMode>
);
