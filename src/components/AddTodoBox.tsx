import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getGlobals } from "../selectors";
import { Todo as TodoInterface } from "../types";
import { addTodo } from "../slices/todos";

const AddTodoBox: React.FC = () => {

  const { toggleTodoAddBox } = useSelector(getGlobals);
  const dispatch = useDispatch();

  const [taskText, setTaskText] = useState("");
  const [dateText, setDateText] = useState("");
  const [timeText, setTimeText] = useState("");

  const handleTaskTextChange = (e: React.FormEvent<HTMLInputElement>) => {setTaskText(e.currentTarget.value)};
  const handleDateTextChange = (e: React.FormEvent<HTMLInputElement>) => {setDateText(e.currentTarget.value)};
  const handleTimeTextChange = (e: React.FormEvent<HTMLInputElement>) => {setTimeText(e.currentTarget.value)};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // see if the task is valid
    if (taskText != "") {
      let todo: TodoInterface = {
        body: taskText,
        date: dateText,
        time: timeText,
        done: false
      }
      // parse date time
      if (dateText != "") {
        let parsedDate = new Date(dateText);
        if (isNaN(parsedDate.getTime())) return;
        // fix year
        if (parsedDate.getFullYear() < new Date().getFullYear()) parsedDate.setFullYear(new Date().getFullYear());
        todo.date = parsedDate.toDateString();
        // parse time if added
        if (timeText != "") {
          var time = timeText.match(/(\d+)(:(\d\d))?\s*(p?)/i);	
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
      dispatch(addTodo(todo));
    }
  }

  const render = () => {
    return (
      <div className="add-todo-container">
        <form className="add-todo-content" onSubmit={handleSubmit}>
          <input onChange={handleTaskTextChange} value={taskText} placeholder="Task"/>
          <input onChange={handleDateTextChange} value={dateText} placeholder="Date"/>
          <input onChange={handleTimeTextChange} value={timeText} placeholder="Time"/>
          <input className="submit-button" type="submit" />
        </form>
      </div>
    )
  }

  return(
    <>
      {toggleTodoAddBox ? render() : null}
    </>
  )
}

export default AddTodoBox;