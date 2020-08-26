import { combineReducers, Reducer } from "redux";

import todosReducer from "./todos";
import globalsReducer from "./globals";
import { RootState } from "../types";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  todosState: todosReducer,
  globalsState: globalsReducer,
});

export default rootReducer;