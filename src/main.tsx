import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./services/API";
import GlobalContextProvider from "./context/context";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider api={api}>
        <GlobalContextProvider>
          <LazyMotion features={domAnimation}>
            <App />
          </LazyMotion>
        </GlobalContextProvider>
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
