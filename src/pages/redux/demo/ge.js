function* F() {
  const info = yield 1;
  console.log(info);
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

const f = rootSaga();

function* rootSaga() {
  //   console.log("saga开始");
  //   // yield counterTask()
  //   yield all([counterTask(), counterTask2()]);
  //   console.log("saga结束");

  // const res = yield call(p);
  // console.log("yield call(p)：", res);
  const res = yield 1;
  console.log("yield 1:", res);
}

const result = f.next();
f.next(result.value);
