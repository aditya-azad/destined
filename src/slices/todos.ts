import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { randomIDGenerator } from "../utils";
import { Todo, TodoStateInterface, TodoModifyPayload } from "../types";
import { saveTodos, fetchTodos } from "../utils";

let initialState:TodoStateInterface = fetchTodos();

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {

    addTodo: (state, { payload }: PayloadAction<Todo>) => {
      let id: string = randomIDGenerator();
      let todo = payload;
      if (todo.body != "") {
        // parse date time
        if (todo.date != "") {
          let parsedDate = new Date(todo.date);
          if (isNaN(parsedDate.getTime())) return;
          // fix year
          if (parsedDate.getFullYear() < new Date().getFullYear()) parsedDate.setFullYear(new Date().getFullYear());
          todo.date = parsedDate.toDateString();
          // parse time if added
          if (todo.time != "") {
            var time = todo.time.match(/(\d+)(:(\d\d))?\s*(p?)/i);
            if (time == null) return;
            var hours = parseInt(time[1],10);
            if (hours == 12 && !time[4]) { hours = 0; }
            else { hours += (hours < 12 && time[4])? 12 : 0; }	
            var d = new Date();
            d.setHours(hours);
            d.setMinutes(parseInt(time[3],10) || 0);
            d.setSeconds(0, 0);
            todo.time = d.toLocaleTimeString();
          }
        }
        while (id in state) {
          id = randomIDGenerator();
        }
        let newState = {
          ...state,
          [id]: payload
        }
        saveTodos(newState);
        return(newState);
      }
      return ({ ...state });
    },

    modifyTodo: (state, { payload }: PayloadAction<TodoModifyPayload>) => {
      if (payload.id in state) {
        let id: string = payload.id;
        let newState = {
          ...state,
          [id]: payload.todo
        };
        saveTodos(newState);
        return (newState);
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