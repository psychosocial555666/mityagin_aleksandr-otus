import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.scss';
import App from './js/components/app/app.jsx';
import {createStore} from "redux";
import reducer from "./js/reducer/reducer";
import {Provider} from "react-redux";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.querySelector(`#root`)
);
