import * as React from "react";
import { TodoProps } from "../types";

const Todo: React.FC<TodoProps> = (props) => {

  const todo = props.todo;

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

  return (
    <div className="todo-container">
      <div className="todo-checkbox"></div>
      <div className={"todo-body" + (props.overdue ? " todo-overdue" : "")}>
        {todo.body}
        <div className={"todo-timestamp-container" + (props.overdue ? " todo-overdue" : "")}>
          {props.shouldDisplayDate && todo.date != "" ? renderDate() : null}
          {props.shouldDisplayTime && todo.time != "" ? renderTime() : null}
        </div>
      </div>
    </div>
  )
}

export default Todo;