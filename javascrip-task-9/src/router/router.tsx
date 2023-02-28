import { createBrowserRouter, LoaderFunctionArgs } from "react-router-dom";
import { App } from "../components/App/App";
import { ErrorPage } from "../components/ErrorPage/ErrorPage";
import { Weather } from "../components/Weather/Weather";
import { cities } from "../utils/cities";

export const rootLoader = () => {
  return { citiesList: cities };
};

export const cityLoader = ({ params }: LoaderFunctionArgs) => {
  return cities.find((item) => item.id === params.id);
}

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
