import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { GlobalsState } from "../types";

const initialState: GlobalsState = {
  toggleTodoAddBox: false,
};

const globalsSlice = createSlice({
  name: "globals",
  initialState,
  reducers: {
    toggleAddTodoBar: (state) => {
      return({
        ...state,
        toggleTodoAddBox: !state.toggleTodoAddBox
      });
    }
  }
});

export const {
  toggleAddTodoBar
} = globalsSlice.actions;

export default globalsSlice.reducer;
