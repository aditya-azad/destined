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
    if (taskText != "") {
      let todo: TodoInterface = {
        body: taskText,
        date: dateText,
        time: timeText,
        done: false
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