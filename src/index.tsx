import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import "./styles/index.scss";
import Display from "./components/Display";
import rootReducer from "./slices";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
})

ReactDOM.render(
  <Provider store={store}>
    <Display />
  </Provider>,
  document.getElementById("root")
);
