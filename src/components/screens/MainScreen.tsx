import * as React from "react";
import Todo from "../Todo";

const MainScreen: React.FC = () => {
  return (
    <div className="display-container">
      <div>
        <h1>Today</h1>
        <div>
          <Todo shouldDisplayDate={false} body="Do this"/>
        </div>
        <h1>Upcoming</h1>
        <div>
          <Todo shouldDisplayDate={true} body="Do that"/>
        </div>
      </div>
    </div>
  )
}

export default MainScreen;