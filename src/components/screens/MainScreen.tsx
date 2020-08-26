import * as React from "react";
import { useSelector } from "react-redux";

import Todo from "../Todo";
import TopBar from "../Topbar";
import AddTodoBox from "../AddTodoBox";
import { getTodos } from "../../selectors";

const MainScreen: React.FC = () => {

  const todos = useSelector(getTodos);

  let todoList = [];

  for (let key in todos) {
    todoList.push(
      <Todo key={key} shouldDisplayDate={true} shouldDisplayTime={true} body={todos[key].body}/>
    )
  }

  return (
    <div className="display-container">
      <div className="display-content">
        <TopBar/>
        <AddTodoBox />

        <div className="category-container">
          <h1 className="category-heading">Today</h1>
          {todoList}
        </div>

        <div className="category-container">
          <h1 className="category-heading">Upcoming</h1>
        </div>

      </div>
    </div>
  )
}

export default MainScreen;