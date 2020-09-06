import * as React from "react";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { TodoProps } from "../types";
import { Todo as TodoInterface } from "../types";
import { deleteTodo, addTodo, modifyTodo } from "../slices/todos";

const Todo: React.FC<TodoProps> = ({todo, id, overdue, shouldDisplayDate, shouldDisplayTime, todoAdder}) => {

  const dispatch = useDispatch();

  const [taskText, setTaskText] = useState(todo ? todo.body : "");
  const [dateText, setDateText] = useState(todo ? todo.date : "");
  const [timeText, setTimeText] = useState(todo ? todo.time : "");
  const [modifying, setModifying] = useState(todoAdder ? true : false);

  const handleTaskTextChange = (e: React.FormEvent<HTMLInputElement>) => {setTaskText(e.currentTarget.value)};
  const handleDateTextChange = (e: React.FormEvent<HTMLInputElement>) => {setDateText(e.currentTarget.value)};
  const handleTimeTextChange = (e: React.FormEvent<HTMLInputElement>) => {setTimeText(e.currentTarget.value)};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newTodo: TodoInterface = {
      body: taskText,
      date: dateText,
      time: timeText
    }
    if (todoAdder) {
      dispatch(addTodo(newTodo))
    } else {
      dispatch(modifyTodo({todo: newTodo, id}))
      setModifying(false);
    }
  }

  const markDone = () => {
    dispatch(deleteTodo(id));
  }

  const renderDate = () => {
    let arr = todo.date.split(" ");
    let string = arr[0] + ", " + parseInt(arr[2]) + " " + arr[1];
    if (parseInt(arr[3]) > new Date().getFullYear()) string += " " + arr[3];
    return (
      <div>
        {string}
      </div>
    )
  }

  const renderTime = () => {
    let arr = todo.time.split(" ");
    let arr2 = arr[0].split(":");
    let string = arr2[0];
    if (parseInt(arr2[1]) != 0) string += ":" + arr2[1];
    string += " " + arr[1];
    return (
      <div>
        {string}
      </div>
    )
  }

  const renderModifier = () => {
    return (
      <form className="add-todo-content" onSubmit={handleSubmit}>
        <input onChange={handleTaskTextChange} value={taskText} placeholder="Task" autoFocus />
        <input onChange={handleDateTextChange} value={dateText} placeholder="Date" />
        <input onChange={handleTimeTextChange} value={timeText} placeholder="Time" />
        {todoAdder ? null : <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deleteTodo(id))} />}
        <input className="submit-button" type="submit" />
      </form>
    )
  }

  const renderNormal = () => {
    return (
      <div className="todo-container">
        <div className="todo-checkbox" onClick={markDone}></div>
        <div onClick={() => setModifying(true)}
            className={"todo-body" + (overdue ? " todo-overdue" : "")}>
          {todo ? todo.body : null}
          <div className={"todo-timestamp-container" + (overdue ? " todo-overdue" : "")}>
            {shouldDisplayDate && todo.date != "" ? renderDate() : null}
            {shouldDisplayTime && todo.time != "" ? renderTime() : null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {modifying ? renderModifier() : renderNormal()}
    </>
  )
}

export default Todo;