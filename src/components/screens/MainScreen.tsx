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

  // sort the lists
  todayTodoList.sort(dateSorter);
  overdueTodoList.sort(dateSorter);
  upcomingTodoList.sort(dateSorter);

  const renderCategory = (title: string, list: any[]) => {
    if (list.length > 0) {
      return (
        <div className="category-container">
          <h1 className="category-heading">{title}</h1>
          {list}
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <div className="display-container">
      <div className="display-content">
        <TopBar/>
        <AddTodoBox />
        {renderCategory("Overdue", overdueTodoList)}
        {renderCategory("Today", todayTodoList)}
        {renderCategory("Upcoming", upcomingTodoList)}
        {renderCategory("Unscheduled", unscheduledTodoList)}
      </div>
    </div>
  )
}

export default MainScreen;
