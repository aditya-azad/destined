import * as React from "react";
import { useSelector } from "react-redux";

import Todo from "../Todo";
import TopBar from "../Topbar";
import AddTodoBox from "../AddTodoBox";
import Category from "../Category";
import { getTodos } from "../../selectors";

const MainScreen: React.FC = () => {

  const todos = useSelector(getTodos);

  let todayTodoList = [];
  let upcomingTodoList = [];
  let unscheduledTodoList = [];
  let overdueTodoList = [];

  const isToday = (dateTimeString: string) => {
    let currDate = new Date(new Date().toDateString());
    let date = new Date(new Date(dateTimeString).toDateString());
    return date.getTime() - currDate.getTime();
  }

  // populate the lists
  for (let key in todos) {
    let dateTimeString = todos[key].date + " " + todos[key].time;
    if (todos[key].date == "") {
      unscheduledTodoList.push(
        <Todo key={key} todo={todos[key]} id={key}/>
      )
    } else if (isToday(dateTimeString) == 0) {
      todayTodoList.push(
        <Todo key={key} shouldDisplayTime={true} todo={todos[key]} id={key}/>
      )
    } else if (isToday(dateTimeString) < 0) {
      overdueTodoList.push(
        <Todo key={key} shouldDisplayDate={true} shouldDisplayTime={true} todo={todos[key]} id={key}/>
      )
    } else {
      upcomingTodoList.push(
        <Todo key={key} shouldDisplayDate={true} shouldDisplayTime={true} todo={todos[key]} id={key}/>
      )
    }
  }

  return (
    <div className="display-container">
      <div className="display-content">
        <TopBar/>
        <AddTodoBox />
        <Category title="Overdue" todos={overdueTodoList} sort={1}/>
        <Category title="Today" todos={todayTodoList} sort={0}/>
        <Category title="Upcoming" todos={upcomingTodoList} sort={1}/>
        <Category title="Unscheduled" todos={unscheduledTodoList} sort={2}/>
      </div>
    </div>
  )
}

export default MainScreen;
