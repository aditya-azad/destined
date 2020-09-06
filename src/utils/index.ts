import { ipcRenderer } from "electron";

import { TodoStateInterface, Todo } from "../types";

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
  return ipcRenderer.sendSync("get-todos");
}

export const todoParser = (todo: Todo): boolean => {
  // parse body
  if (todo.body != "") {
    // parse date 
    if (todo.date != "") {
      let parsedDate = new Date(todo.date);
      // check for special case
      if (todo.date.match(/^t.*$/i)) parsedDate = new Date();
      // final check
      if (isNaN(parsedDate.getTime())) return false;
      // fix year if not fixed
      if (parsedDate.getFullYear() < new Date().getFullYear()) parsedDate.setFullYear(new Date().getFullYear());
      todo.date = parsedDate.toDateString();
      // parse time
      if (todo.time != "") {
        var time = todo.time.match(/(\d+)(:(\d\d))?\s*(p?)/i);	
        if (time == null) return false;
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
    // parse repeat
    if (todo.repeat != "") {
      if (todo.date == "") return false;
      let repeat = todo.repeat.match(/[dwmy]/i);
      if (!repeat) return false;
      todo.repeat = repeat[0];
    }
    return true;
  }
  return false;
}