import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@misc/theme";
import DfxContextProvider from "./context/DfxContext";
import { BrowserRouter } from "react-router-dom";
import GlobalContextProvider from "./context/GlobalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalContextProvider>
          <DfxContextProvider>
            <App />
          </DfxContextProvider>
        </GlobalContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
