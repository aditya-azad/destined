import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toggleAddTodoBar } from "../slices/globals";

const TopBar: React.FC = () => {

  const dispatch = useDispatch();

  const getDateTime = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let currDateTime = new Date();
    let formattedDateTime = currDateTime.getDate() + " " +
      months[currDateTime.getMonth()] + " " + currDateTime.getFullYear() + ", " +
      days[currDateTime.getDay()] + ", " + currDateTime.toLocaleTimeString();
    return formattedDateTime;
  }

  useEffect(() => {
    setTimeout(() => {
      setDateTime(getDateTime());
    }, 1000);
  });

  const [dateTime, setDateTime] = useState(getDateTime());

  return (
    <div className="topbar-container">
      <div>
        {dateTime}
      </div>
      <div>
        <div><FontAwesomeIcon icon={faPlus} onClick={() => dispatch(toggleAddTodoBar())}/></div>
      </div>
    </div>
  )
}

export default TopBar;