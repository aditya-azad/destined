import { ipcRenderer } from "electron";

import { TodoStateInterface } from "../types";

export const randomIDGenerator = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4() + s4() + s4();
}

export const saveTodos = (todos: TodoStateInterface) => {
  ipcRenderer.invoke("save-todos", JSON.stringify(todos));
}

export const fetchTodos = () => {
  return JSON.parse(JSON.parse(ipcRenderer.sendSync("get-todos")));
}
