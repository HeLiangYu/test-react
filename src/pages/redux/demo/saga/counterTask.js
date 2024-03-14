import { take, takeEvery, delay, put, call, select } from "redux-saga/effects";

function p() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(43);
    }, 2000);
  });
}

function* asyncAdd() {
  console.log("触发了asyncAdd");
  yield testDelay();
  yield put({ type: "change", payload: 8 });
}

function* add() {
  console.log("触发了add");
  //   const res = yield p();
  const res = yield call(p);

  console.log(res);

  const store = yield select();
  console.log("store", store);
}

function* testDelay() {
  console.log("测试delay");

  yield delay(2000);
  console.log("2000ms后输出delay");
}

export default function* counterTask() {
  yield takeEvery("asyncAdd", asyncAdd);
  yield takeEvery("add", add);
}
