import { combineReducers } from "redux";
import { getAllUserDataReducer } from "./user.Reducer";
import { getAllCountryReducer } from "./country.Reducer";

export const rootReducer = combineReducers({
  getAllUserDataReducer,
  getAllCountryReducer,
});
