import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { router } from "./router/router";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={darkTheme}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ThemeProvider>
);
