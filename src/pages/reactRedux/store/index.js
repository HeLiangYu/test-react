import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return state + 1;
    case "increase":
      return state - 1;
    case "change":
      return state + action.payload;
    default:
      return state;
  }
};

const store = createStore(reducer, 0, applyMiddleware(logger));

export default store;
