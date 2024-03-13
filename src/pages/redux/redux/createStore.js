export default function createStore(reducer, initState, enhanced) {
  const currentReducer = reducer;
  let currentState = initState;

  const listeners = [];

  if (typeof initState === "function") {
    enhanced = initState;
    initState = undefined;
  }
  if (typeof enhanced === "function") {
    return enhanced(createStore)(reducer, initState);
  }

  function dispatch(action) {
    console.log(action);
    // 验证action
    if (Object.getPrototypeOf(action) !== Object.prototype) {
      throw new TypeError("action is not a plain object");
    }
    if (!("type" in action)) {
      throw new TypeError("action has not type");
    }

    currentState = currentReducer(currentState, action);
    triggerListener();
  }

  function triggerListener() {
    for (const listener of listeners) {
      listener();
    }
  }

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return () => {
      const i = listeners.indexOf(listener);
      listeners.splice(i, 1);
    };
  }

  // 初始化调用dispatch，用于初始化state
  dispatch({ type: "@redux/随机字符串" });

  return {
    dispatch,
    getState,
    subscribe,
  };
}
