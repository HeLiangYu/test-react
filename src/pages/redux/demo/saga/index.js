// import { all, call } from "redux-saga/effects";
import {
  call,
  delay,
  put,
  select,
  take,
  fork,
  cancel,
  takeEvery,
  all,
} from "../../redux-saga/effects";
import counterTask from "./counterTask";
import counterTask2 from "./counterTask2";

function p() {
  return new Promise((resolve) => {
    resolve(8);
  });
}

function* testFork() {
  while (true) {
    const action = yield take("add");
    console.log("action", action);
  }
}

function* testAllAdd() {
  yield take("add");
  console.log("监听到add");
}

function* testAllIncrease() {
  yield take("increase");
  console.log("监听到increase");
}

export default function* rootSaga() {
  //   console.log("saga开始");
  //   // yield counterTask()
  //   yield all([counterTask(), counterTask2()]);
  //   console.log("saga结束");
  // const res = yield call(p);
  // console.log("yield call(p)：", res);
  // const res = yield 1;
  // console.log("yield 1:", res);
  // const start = Date.now();
  // yield delay(2000);
  // console.log("2s后输出", Date.now() - start);
  // yield put({ type: "add" });
  // const store = yield select();
  // console.log("store", store);
  // const task = yield fork(testFork);
  // yield delay(5000);
  // yield cancel(task);
  // console.log("5s后关闭fork", task);
  // yield takeEvery("add", function* () {
  //   console.log("监听add");
  //   yield delay(2000);
  //   console.log("2s后处理监听");
  // });
  // console.log("saga结束");

  yield all([testAllAdd(), testAllIncrease()]);
  console.log("运行完成");
}
