import * as React from "react";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const TopBar: React.FC = () => {

  const getDateTime = () => {
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    let currDateTime = new Date();
    let formattedDateTime = currDateTime.getDate() + " " + months[currDateTime.getMonth()] + " " + currDateTime.getFullYear() + ", " + currDateTime.toLocaleTimeString();
    return formattedDateTime;
  }

  const [dateTime, setDateTime] = useState(getDateTime());

  useEffect(() => {
    setTimeout(() => {
      setDateTime(getDateTime());
    }, 1000);
  });

  return (
    <div className="topbar-container">
      <div className="topbar-left-container">
        {dateTime}
      </div>
      <div className="topbar-right-container">
        <div className="topbar-menu-item"><FontAwesomeIcon icon={faPlus}/></div>
      </div>
    </div>
  )
}

export default TopBar;