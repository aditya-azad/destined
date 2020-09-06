import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { randomIDGenerator } from "../utils";
import { Todo, TodoStateInterface, TodoWithIDPayload } from "../types";
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

    modifyTodo: (state, { payload }: PayloadAction<TodoWithIDPayload>) => {
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

    doneTodo: (state, { payload }: PayloadAction<string>) => {
      let newState = { ...state };
      let todo = {...newState[payload]};
      if (todo.repeat != "") {
        let currDate = new Date(todo.date);
        switch (todo.repeat) {
          case "d":
            currDate.setDate(currDate.getDate() + 1);
            break;
          case "w":
            currDate.setDate(currDate.getDate() + 7);
            break;
          case "m":
            currDate.setMonth(currDate.getMonth() + 1);
            break;
          case "y":
            currDate.setFullYear(currDate.getFullYear() + 1);
            break;
        }
        todo.date = currDate.toDateString();
        newState[payload] = todo;
      } else {
        delete newState[payload];
      }
      saveTodos(newState);
      return newState;
    }

  }
});

export const {
  addTodo,
  modifyTodo,
  doneTodo,
  deleteTodo
} = todosSlice.actions;

export default todosSlice.reducer;