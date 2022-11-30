import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";

export let rootReducer = combineReducers({ userReducer });
