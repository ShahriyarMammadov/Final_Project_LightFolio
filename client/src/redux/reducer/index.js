import { combineReducers } from "redux";
import { getAllUserDataReducer } from "./user.Reducer";

export const rootReducer = combineReducers({
  getAllUserDataReducer,
});
