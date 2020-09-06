import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { randomIDGenerator } from "../utils";
import { Todo, TodoStateInterface, TodoModifyPayload } from "../types";
import { saveTodos, fetchTodos, todoParser } from "../utils";

let initialState:TodoStateInterface = fetchTodos();

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {

    addTodo: (state, { payload }: PayloadAction<Todo>) => {
      let todo = payload;
      // parse Todo
      if (todoParser(todo)) {
        // generate id
        let id: string = randomIDGenerator();
        while (id in state) {
          id = randomIDGenerator();
        }
        // create new state
        let newState = {
          ...state,
          [id]: todo
        }
        // write state to file
        saveTodos(newState);
        return(newState);
      } else {
        return ({ ...state });
      }
    },

    modifyTodo: (state, { payload }: PayloadAction<TodoModifyPayload>) => {
      if (payload.id in state) {
        let todo = payload.todo;
        // parse todo
        if (todoParser(todo)) {
          let id: string = payload.id;
          let newState = {
            ...state,
            [id]: payload.todo
          };
          saveTodos(newState);
          return (newState);
        }
      }
      return ({ ...state })
    },

    deleteTodo: (state, { payload }: PayloadAction<string>) => {
      let newState = { ...state };
      delete newState[payload];
      saveTodos(newState);
      return newState;
    },

    readTodosFromFile: (state, { payload }: PayloadAction<TodoStateInterface>) => {
      console.log("reducer called");
      return payload;
    }
  }
});

export const {
  addTodo,
  modifyTodo,
  deleteTodo,
  readTodosFromFile
} = todosSlice.actions;

export default todosSlice.reducer;