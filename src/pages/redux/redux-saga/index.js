import Channel from "./Channel";
import runSaga from "./runSaga";

// 导出一个函数，用于创建中间件
export default function createSagaMiddleware() {
  function sagaMiddleware(store) {
    const channel = new Channel();
    const env = { store, channel };
    sagaMiddleware.run = (...args) => runSaga(env, ...args);
    return (next) => {
      return (action) => {
        // 此处不对dispatch做任何操作
        // saga通过run方法开启一个saga任务
        // 直接转交action即可
        const dispatch = next(action);
        channel.put(action.type, action);
        return dispatch;
      };
    };
  }

  return sagaMiddleware;
}
