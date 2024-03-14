import { createEffect, effectTypes } from "../effectHelper";
import { runIterator } from "../runSaga";
import { fork } from "./fork";

export function all(funcs) {
  return createEffect(effectTypes.ALL, {
    funcs,
  });
}

export function runAllEffect(env, effect, next) {
  const { funcs } = effect.payload;
  const forkArr = funcs
    .map((fn) => runIterator(env, fn))
    .map((task) => task.toPromise());

  Promise.all(forkArr).then(next);
}
