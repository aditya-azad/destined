import { RootState } from "../types";

export const getGlobals = (state: RootState) => state.globalsState;
export const getTodos = (state: RootState) => state.todosState;