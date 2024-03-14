import { fork } from "./fork";
import { take } from "./take";

export function takeEvery(actionType, generator) {
  return fork(function* () {
    while (true) {
      yield take(actionType);
      yield fork(generator);
    }
  });
}
