import ReactDOM from "react-dom";
import "./css/style.scss";
import App from "./js/components/app/app";
import { store } from "./js/reducer/reducer";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App modalType="NONE" />
  </Provider>,
  document.querySelector(`#root`)
);
