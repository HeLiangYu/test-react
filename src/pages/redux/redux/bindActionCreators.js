export default function bindActionCreators(action, dispatch) {
  if (typeof action === "function") {
    return getAutoAction(action, dispatch);
  } else if (typeof action === "object") {
    const result = {};
    for (const key in action) {
      result[key] = getAutoAction(action[key], dispatch);
    }

    return result;
  }
}

function getAutoAction(action, dispatch) {
  return (...args) => {
    dispatch(action(...args));
  };
}
