import * as React from "react";

export interface TodoProps {
  shouldDisplayDate: boolean
  body: string
}

const Todo: React.FC<TodoProps> = ({shouldDisplayDate, body}) => {
  return (
    <div>
      {shouldDisplayDate ? <div>Date</div> : null}
      <div>{body}</div>
    </div>
  )
}

export default Todo;