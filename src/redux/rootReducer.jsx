import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";
import { loadingReducer } from "./reducers/loadingReducer";
import { statusReducer } from "./reducers/statusReducer";

export let rootReducer = combineReducers({
  userReducer,
  loadingReducer,
  statusReducer,
});
