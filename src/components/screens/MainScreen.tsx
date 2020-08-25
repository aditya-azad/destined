import * as React from "react";

import Todo from "../Todo";
import TopBar from "../Topbar";

const MainScreen: React.FC = () => {
  return (
    <div className="display-container">
      <div className="display-content">
        <TopBar/>

        <div className="category-container">
          <h1 className="category-heading">Today</h1>
          <Todo shouldDisplayDate={false} shouldDisplayTime={true} body="Do this"/>
          <Todo shouldDisplayDate={false} shouldDisplayTime={true} body="Do this"/>
          <Todo shouldDisplayDate={false} shouldDisplayTime={true} body="Do this"/>
        </div>

        <div className="category-container">
          <h1 className="category-heading">Upcoming</h1>
          <Todo shouldDisplayDate={true} shouldDisplayTime={true} body="Do that"/>
        </div>

      </div>
    </div>
  )
}

export default MainScreen;