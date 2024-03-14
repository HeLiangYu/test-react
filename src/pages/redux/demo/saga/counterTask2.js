import { take } from "redux-saga/effects";

export default function* counterTask() {
  while (true) {
    yield take("increase");
    console.log("监听increase");
  }
}
