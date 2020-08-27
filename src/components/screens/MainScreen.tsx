import * as React from "react";
import { useSelector } from "react-redux";

import Todo from "../Todo";
import TopBar from "../Topbar";
import AddTodoBox from "../AddTodoBox";
import { getTodos } from "../../selectors";

const MainScreen: React.FC = () => {

  const todos = useSelector(getTodos);

  let todayTodoList = [];
  let upcomingTodoList = [];
  let unscheduledTodoList = [];
  let overdueTodoList = [];

  console.log(todos);

  const dateSorter = (a: any, b: any) => {
    let dateA = new Date(a.props.todo.date + " " + a.props.todo.time);
    let dateB = new Date(b.props.todo.date + " " + b.props.todo.time);
    return dateA.getTime() - dateB.getTime();
  };

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
        <Todo key={key} todo={todos[key]}/>
      )
    } else if (isToday(dateTimeString) == 0) {
      todayTodoList.push(
        <Todo key={key} shouldDisplayTime={true} todo={todos[key]}/>
      )
    } else if (isToday(dateTimeString) < 0) {
      overdueTodoList.push(
        <Todo key={key} shouldDisplayDate={true} shouldDisplayTime={true} todo={todos[key]} overdue={true}/>
      )
    } else {
      upcomingTodoList.push(
        <Todo key={key} shouldDisplayDate={true} shouldDisplayTime={true} todo={todos[key]}/>
      )
    }
  }

  todayTodoList.sort(dateSorter);
  overdueTodoList.sort(dateSorter);
  upcomingTodoList.sort(dateSorter);

  return (
    <div className="display-container">
      <div className="display-content">
        <TopBar/>
        <AddTodoBox />

        <div className="category-container">
          <h1 className="category-heading">Today</h1>
          {overdueTodoList}
          {todayTodoList}
        </div>

        <div className="category-container">
          <h1 className="category-heading">Upcoming</h1>
          {upcomingTodoList}
        </div>

        <div className="category-container">
          <h1 className="category-heading">Unscheduled</h1>
          {unscheduledTodoList}
        </div>

      </div>
    </div>
  )
}

export default MainScreen;