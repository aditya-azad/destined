import * as React from "react";
import { useSelector } from "react-redux";

import { getGlobals } from "../selectors";
import Todo from "./Todo";

const AddTodoBox: React.FC = () => {

  const { toggleTodoAddBox } = useSelector(getGlobals);

  const render = () => {
    return (
      <div className="add-todo-container">
        <Todo todoAdder={true}/>
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