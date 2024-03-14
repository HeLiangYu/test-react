import { createEffect, effectTypes } from "../effectHelper";
import runSaga from "../runSaga";

export function fork(generator, ...args) {
  return createEffect(effectTypes.FORK, {
    generator: generator,
    args,
  });
}

export function runForkEffect(env, effect, next) {
  const { generator, args } = effect.payload;
  const task = runSaga(env, generator, ...args);
  next(task);
}
