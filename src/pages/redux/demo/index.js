import {
  // createStore,
  bindActionCreators,
  combineReducers,
  applyMiddleware,
  createStore,
} from "../redux";
// import { applyMiddleware } from "redux";
import logger from "redux-logger";
// import { thunk } from "redux-thunk";
import { thunk } from "../redux-thunk";
import rPromise from "redux-promise";
import createSagaMiddleware from "../redux-saga";
// import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return state + 1;
    case "increase":
      return state - 1;
    case "change":
      return action.payload;
    default:
      return state;
  }
};

// const store = createStore(
//   combineReducers({
//     num: reducer,
//   }),
//   {
//     num: 1,
//   }
// );
// const store = createStore(reducer, 1);

function log1(store) {
  console.log("中间1初始化");
  return (next) => {
    console.log("中间1创建dispatch");

    return (action) => {
      console.log("中间1执行开始", action);
      next(action);
      console.log("中间1执行结束", action);
    };
  };
}

function log2(store) {
  console.log("中间2初始化");
  return (next) => {
    console.log("中间2创建dispatch");

    return (action) => {
      console.log("中间2执行开始", action);
      next(action);
      console.log("中间2执行结束", action);
    };
  };
}

// const store = applyMiddleware(log1, log2)(createStore)(reducer, 1);
// const store = createStore(
//   reducer,
//   1,
//   applyMiddleware(rPromise, log1, log2, logger)
// );

// const unListen = store.subscribe(() => {
//   console.log(1, "update");
// });

// store.subscribe(() => {
//   console.log(2, "update");
// });

// console.log(store.getState());

// store.dispatch({ type: "add" });

// console.log(store.getState());

// unListen();

// store.dispatch({ type: "add" });

// console.log(store.getState());

// const addAction = () => {
//   return { type: "add" };
// };

// const fn = bindActionCreators(
//   {
//     add: addAction,
//     increase: () => {
//       return {
//         type: "increase",
//       };
//     },
//   },
//   store.dispatch
// );

// fn.add();

// console.log(store.getState());

// const thunkAction = function () {
//   return {
//     type: "change",
//     payload: new Promise((resolve) => {
//       resolve(92);
//     }),
//   };
// };

// store.dispatch(thunkAction());

// redux-saga
const saga = createSagaMiddleware();

const store = createStore(reducer, 1, applyMiddleware(saga, logger));

saga.run(rootSaga);

window.add = () => store.dispatch({ type: "add" });
window.increase = () => store.dispatch({ type: "increase" });

window.dispatch = (type) => store.dispatch({ type });
