import { createEffect, effectTypes } from "../effectHelper";
import isPromise from "is-promise";

// 创建一个callEffect对象
export function call(fn, ...args) {
  let context = null;
  if (Array.isArray(fn)) {
    context = fn[0];
    fn = fn[1];
  }
  return createEffect(effectTypes.CALL, {
    context,
    fn,
    args,
  });
}

export function runCallEffect(env, effect, next) {
  const { context, fn, args } = effect.payload;

  const result = fn.call(context, ...args);

  if (isPromise(result)) {
    result.then(next, (err) => next(null, err));
  } else {
    next(result);
  }
}
