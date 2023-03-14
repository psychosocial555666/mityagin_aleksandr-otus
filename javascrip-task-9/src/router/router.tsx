import { createBrowserRouter } from "react-router-dom";
import { App } from "../components/App/App";
import { ErrorPage } from "../components/ErrorPage/ErrorPage";
import { Weather } from "../components/Weather/Weather";
import { rootLoader, cityLoader } from "../utils/utils";
import { storageController } from "../utils/cities";

storageController.init();

export const router = createBrowserRouter([
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
