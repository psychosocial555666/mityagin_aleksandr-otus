import {combineReducers, createStore} from "redux";
import {reducer as ui} from "./ui/ui";
import NameSpace from "./name-space";

const reducer =  combineReducers({
  [NameSpace.UI]: ui,
});

export const store = createStore(
  reducer
  // window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);
