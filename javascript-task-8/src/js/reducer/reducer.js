import {combineReducers} from "redux";
import {reducer as ui} from "./ui/ui";
import NameSpace from "./name-space";

export default combineReducers({
  [NameSpace.UI]: ui,
});
