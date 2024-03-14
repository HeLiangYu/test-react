import { createEffect, effectTypes } from "../effectHelper";

export function put(action) {
  return createEffect(effectTypes.PUT, {
    action,
  });
}

export function runPutEffect(env, effect, next) {
  const { action } = effect.payload;
  const { dispatch } = env.store;

  next(dispatch(action));
}
