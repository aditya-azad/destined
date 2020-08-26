import * as React from "react";
import { TodoProps } from "../types";

const Todo: React.FC<TodoProps> = ({shouldDisplayDate, shouldDisplayTime, body}) => {
  return (
    <div className="todo-container">
      <div className="todo-checkbox"></div>
      <div className="todo-body">
        {body}
        <div className="todo-timestamp-container">
          {shouldDisplayDate ? <div>Date</div> : null}
          {shouldDisplayTime ? <div>Time</div> : null}
        </div>
      </div>
    </div>
  )
}

export default Todo;