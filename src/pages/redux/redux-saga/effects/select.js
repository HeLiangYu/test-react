import { createEffect, effectTypes } from "../effectHelper";

export function select(fn) {
  return createEffect(effectTypes.SELECT, { fn });
}

export function runSelectEffect(env, effect, next) {
  const { fn } = effect.payload;
  let store = env.store.getState();

  if (fn) {
    store = fn(store);
  }

  next(store);
}
