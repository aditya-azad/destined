import * as React from "react";
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faRedoAlt, faCheck } from "@fortawesome/free-solid-svg-icons"

import { TodoProps } from "../types";
import { Todo as TodoInterface } from "../types";
import { deleteTodo, addTodo, modifyTodo, doneTodo } from "../slices/todos";

const Todo: React.FC<TodoProps> = ({todo, id, shouldDisplayDate, shouldDisplayTime, todoAdder}) => {

  const dispatch = useDispatch();

  const [modifying, setModifying] = useState(todoAdder ? true : false);
  const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();

  const [taskText, setTaskText] = useState(todoAdder ? "" : todo.body);
  const [dateText, setDateText] = useState(todoAdder ? "" : todo.date);
  const [timeText, setTimeText] = useState(todoAdder ? "" : todo.time);
  const [todoColor, setTodoColor] = useState(todoAdder ? defaultColor : todo.color);
  const [repeatText, setRepeatText] = useState(todoAdder ? "" : todo.repeat);

  const handleTaskTextChange = (e: React.FormEvent<HTMLInputElement>) => {setTaskText(e.currentTarget.value)};
  const handleDateTextChange = (e: React.FormEvent<HTMLInputElement>) => {setDateText(e.currentTarget.value)};
  const handleTimeTextChange = (e: React.FormEvent<HTMLInputElement>) => {setTimeText(e.currentTarget.value)};
  const handleTodoColorChange = (color: string) => {setTodoColor(color)};
  const handleRepeatTextChange = (e: React.FormEvent<HTMLInputElement>) => {setRepeatText(e.currentTarget.value)};

  const openEditBox = () => {
    setTaskText(todoAdder ? "" : todo.body);
    setDateText(todoAdder ? "" : todo.date);
    setTimeText(todoAdder ? "" : todo.time);
    setTodoColor(todoAdder ? "" : todo.color);
    setRepeatText(todoAdder ? "" : todo.repeat);
    setModifying(true);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newTodo: TodoInterface = {
      body: taskText,
      date: dateText,
      time: timeText,
      repeat: repeatText,
      color: todoColor
    }
    if (todoAdder) {
      dispatch(addTodo(newTodo))
    } else {
      dispatch(modifyTodo({todo: newTodo, id}))
      setModifying(false);
    }
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

  const renderColorPills = () => {
    // get the default text color from sass
    let colors = [
      defaultColor, "#ddd566", "#c4750d", "#62bf54",
      "#6bd4d6", "#d06bd6", "#db484a"
    ];
    let pills = [];
    for (let i = 0; i < colors.length; i++) {
      pills.push(
        <div key={i}
          className={ colors[i] == todoColor ? "pill pill-active" : "pill" }
          style={{backgroundColor: colors[i]}}
          onClick={() => { handleTodoColorChange(colors[i]) }} />
      );
    }
    return pills;
  }

  const renderModifier = () => {
    return (
      <form className="add-todo-content" onSubmit={handleSubmit}>
        <div className="add-todo-row">
          <input className="grow" onChange={handleTaskTextChange} value={taskText} placeholder="Task" autoFocus />
          <input onChange={handleDateTextChange} value={dateText} placeholder="Date" />
          <input onChange={handleTimeTextChange} value={timeText} placeholder="Time" />
          <input onChange={handleRepeatTextChange} value={repeatText} placeholder="Repeat" />
          {todoAdder ? null : <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deleteTodo(id))} />}
        </div>
        <div className="add-todo-row">
          <div>
            {renderColorPills()}
          </div>
          <FontAwesomeIcon icon={faCheck} onClick={handleSubmit}/>
        </div>
        <input className="submit-button" type="submit" />
      </form>
    )
  }

  const renderNormal = () => {
    return (
      <div className="todo-container">
        <div className="todo-checkbox" onClick={() => dispatch(doneTodo(id))}></div>
        <div onClick={openEditBox}
            className={"todo-body"}>
          <div className="todo-body-left">
            {todo ? <div style={{color: todo.color}}>{todo.body}</div> : null}
            {todo ? (todo.repeat ? <FontAwesomeIcon icon={faRedoAlt} /> : null) : null}
          </div>
          <div className={"todo-timestamp-container"}>
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
