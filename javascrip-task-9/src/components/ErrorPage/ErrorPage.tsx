import { useRouteError } from "react-router-dom";
import { ErrorType } from "../../utils/types";

export function ErrorPage() {
  const error = useRouteError() as ErrorType;

  return (
    <div id="error-page">
      <h1>Упс!</h1>
      <p>Такой страницы не существует</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}