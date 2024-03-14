import { createEffect, effectTypes } from "../effectHelper";

export function take(actionType) {
  return createEffect(effectTypes.TAKE, {
    actionType,
  });
}

export function runTakeEffect(env, effect, next) {
  const { actionType } = effect.payload;
  const fn = (action) => {
    next(action);
  };

  // env.channel.addListener(fn);
  env.channel.take(actionType, fn);
}
