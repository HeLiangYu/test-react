export const effectTypes = {
  CALL: "CALL",
  DELAY: "DELAY",
  PUT: "PUT",
  SELECT: "SELECT",
  TAKE: "TAKE",
  FORK: "FORK",
  CANCEL: "CANCEL",
  ALL: "ALL",
};

/**
 * effect对象特殊的属性名
 */
const specialEffectName = "@@redux-saga/IO";

/**
 * 创建effect
 * @param {*} type 有效的effect类型
 * @param {*} payload
 */
export function createEffect(type, payload) {
  // 验证type值
  if (!Object.values(effectTypes).includes(type)) {
    throw new TypeError("这是一个无效的type值");
  }

  return {
    [specialEffectName]: true,
    type,
    payload,
  };
}

export function isEffect(effect) {
  if (typeof effect !== "object") {
    return false;
  }
  if (effect[specialEffectName] === true) {
    return true;
  }

  return false;
}
