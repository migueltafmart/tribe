import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { STORE } from "./Redux/store";

const render = () =>
  ReactDOM.render(
    <>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </>,
    document.getElementById("root")
  );
STORE.subscribe(render);
render()