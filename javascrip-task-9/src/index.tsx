import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Weather from "./components/Weather/Weather";
import { cities } from "./utils/cities";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export async function rootLoader() {
  const citiesList = await cities;
  return { citiesList };
}

export async function cityLoader({ params }: any) {
  const id = params.id;
  return cities.find((item) => item.id === id);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "weather/:id",
        element: <Weather />,
        loader: cityLoader,
      },
    ],
  },
]);

root.render(
  <ThemeProvider theme={darkTheme}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ThemeProvider>
);
