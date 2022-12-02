import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";
import { loadingReducer } from "./reducers/loadingReducer";

export let rootReducer = combineReducers({ userReducer, loadingReducer });
