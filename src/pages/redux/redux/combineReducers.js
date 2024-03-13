export default function combineReducers(reducers) {
  // 验证reducers有效性
  return (state, action) => {
    const newState = {};
    for (const key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }

    return newState;
  };
}
