import * as React from "react";

export interface TodoProps {
  shouldDisplayDate: boolean
  shouldDisplayTime: boolean
  body: string
}

const Todo: React.FC<TodoProps> = ({shouldDisplayDate, shouldDisplayTime, body}) => {
  return (
    <div className="todo-container">
      <div className="todo-checkbox"></div>
      <div className="todo-body">
        {body}
        <div className="todo-timestamp-container">
          {shouldDisplayDate ? <div className="todo-date">Date</div> : null}
          {shouldDisplayTime ? <div className="todo-time">Time</div> : null}
        </div>
      </div>
    </div>
  )
}

export default Todo;