export default function applyMiddleware(...middlewares) {
  return (createStore) => {
    return (reducer, initState) => {
      const store = createStore(reducer, initState);
      let dispatch = () => {};
      const simpleStore = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args),
      };
      const createDispatches = middlewares.map((createDispatch) =>
        createDispatch(simpleStore)
      );

      dispatch = compose(createDispatches)(store.dispatch);

      return {
        ...store,
        dispatch,
      };
    };
  };
}

// 函数组合
function compose(funcs) {
  if (funcs.length === 0) {
    return (...args) => args;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  //   return (...args) => {
  //     let result = args;
  //     for (let i = funcs.length - 1; i >= 0; i--) {
  //       const func = funcs[i];
  //       if (Array.isArray(result)) {
  //         result = func(...result);
  //       } else {
  //         result = func(result);
  //       }
  //     }

  //     return result;
  //   };

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
