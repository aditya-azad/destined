import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { randomIDGenerator } from "../utils";
import { Todo, TodoModifyPayload } from "../types";

const initialState = {};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<Todo>) => {
      let id: string = randomIDGenerator();
      while (id in state) {
        id = randomIDGenerator();
      }
      return ({
        ...state,
        [id]: payload
      })
    },
    modifyTodo: (state, { payload }: PayloadAction<TodoModifyPayload>) => {
      if (payload.id in state) {
        let id: string = payload.id;
        return ({
          ...state,
          [id]: payload.todo
        })
      }
      return ({
        ...state
      })
    },
    /*
    deleteTodo: (state, { payload }: PayloadAction<string>) => {
      let newState = { ...state };
      delete newState[payload];
      return ({
        ...state
      })
    }
    */
  }
});

export const {
  addTodo,
  modifyTodo,
  //deleteTodo
} = todosSlice.actions;

export default todosSlice.reducer;