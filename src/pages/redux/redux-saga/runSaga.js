import isGenerator from "is-generator";
import Task from "./Task";
import { isEffect } from "./effectHelper";
import isPromise from "is-promise";
import runEffect from "./runEffect";

export default function runSaga(env, generatorFunc, ...args) {
  const iterator = generatorFunc(...args);
  if (isGenerator(iterator)) {
    return runIterator(env, iterator);
  } else {
    console.log("是一个普通函数");
  }

  return runIterator(env, iterator);
}

export function runIterator(env, iterator) {
  const cbObj = {
    callback: null,
  };

  next();

  function next(nextValue, err, isOver) {
    let result;
    if (err) {
      result = iterator.throw(err);
    } else if (isOver) {
      cbObj.callback && cbObj.callback();
      result = iterator.return();
    } else {
      // console.log("调用next", "传入参数：", nextValue);
      result = iterator.next(nextValue);
    }

    // console.log("result", result);

    const { value, done } = result;
    if (done) {
      cbObj.callback && cbObj.callback();
      return;
    }

    // yield call(fn)
    // 调用生成器的next，即直接调用call方法，得到Effect对象
    // 是effect对象的情况下，根据effect对象，调用这个函数fn
    // 再次调用生成器的next，将函数的执行结果传入到next
    // 最后 yield call() 后面的代码，可以得到第二次next之后的结果，即：函数执行的结果
    // yield 相当于调用迭代器的next

    //   处理是Effect的情况
    if (isEffect(value)) {
      runEffect(env, value, next);
    } else if (isPromise(value)) {
      // 处理是promise的情况
      value.then(next, (err) => next(null, err));
    } else {
      // 其他情况，直接进行下一步
      next(value);
    }
  }

  return new Task(next, cbObj);
}
