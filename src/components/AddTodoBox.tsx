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
          var d = new Date();
          var time = timeText.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
          d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
          d.setMinutes( parseInt( time[2]) || 0 );
          d.setSeconds(0);
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