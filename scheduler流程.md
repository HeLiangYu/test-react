## 整体流程
初始创建taskQueue（普通任务），timerQueue（延时任务）
不同级别任务过期基本时间

```js
// 创建一个新的任务
var newTask = {
    id: taskIdCounter++, // 任务 id
    callback, // 该任务具体要做的事情
    priorityLevel, // 任务的优先级别
    startTime, // 任务开始时间
    expirationTime, // 任务的过期时间
    sortIndex: -1, // 用于后面在小顶堆（这是一种算法，可以始终从任务队列中拿出最优先的任务）进行排序的索引
};
```

1. scheduleCallback （开启任务调度）
   1. 传入priorityLevel（任务优先级）, callback（执行的任务）, options（{delay}）
   2. 根据以上信息，以及当前时间戳，计算出 startTime（任务开始时间）：currentTime + delay
   3. 计算出任务过期时间，expirationTime = startTime + 不同级别任务过期基本时间
   4. 得到一个新任务
   5. 如果 startTime > currentTime，即任务开始时间大于当前时间，说明当前任务是延时任务
      1.  newTask.sortIndex = startTime; push(timerQueue, newTask); 将任务推入到延时队列中
      2.  如果 taskQueue 中的任务执行完成，进行延时任务调度：requestHostTimeout(handleTimeout, startTime - currentTime);
   6. 当前任务是普通任务
      1. newTask.sortIndex = expirationTime; push(taskQueue, newTask); 将任务推入到普通任务队列
      2. requestHostCallback(flushWork); 进行普通任务调度
   7. 延时任务
      1. requestHostTimeout(handleTimeout, startTime - currentTime);
2. requestHostCallback （调度普通任务）
   1. scheduledHostCallback = flushWork;
   2. schedulePerformWorkUntilDeadline()；调用此方法，实际上是创建一个宏任务
3. schedulePerformWorkUntilDeadline （创建宏任务）
   1. 在 Node.js and old IE 环境中，localSetImmediate(performWorkUntilDeadline); 创建宏任务
   2. 在有 MessageChannel 环境中，使用 MessageChannel 创建宏任务
```js
if (typeof MessageChannel !== 'undefined') {
  // 大多数情况下，使用的是 MessageChannel
  const channel = new MessageChannel();
  const port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;
  schedulePerformWorkUntilDeadline = () => {
    port.postMessage(null);
  };
}
```
   1. 其他情况，使用 setTimeout 兜底
1. performWorkUntilDeadline （宏任务执行时的监听函数，用于再次开启任务调度）
   1. hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime); 判断是否还有需要执行的任务
   2. 有任务的情况：schedulePerformWorkUntilDeadline(); 创建一个宏任务
2. flushWork （执行workLoop）
   1. workLoop(hasTimeRemaining, initialTime); 本质就是执行workLoop
3. workLoop(hasTimeRemaining<是否还有剩余时间>, initialTime<任务开始执行时间>)，返回是否还有任务需要执行 （执行任务调度的核心代码）
   1. let currentTime = initialTime; advanceTimers(currentTime);
   2. currentTask = peek(taskQueue); 从 taskQueue 里面取一个任务出来
   3. 开启一个 while 循环
      1. 跳出循环
         1. currentTask.expirationTime > currentTime 当前任务还未过期
         2. 且 !hasTimeRemaining || shouldYieldToHost()，没有剩余时间或任务应该暂停
         3. 跳出循环，归还主线程
      2. 执行任务
         1. const callback = currentTask.callback
         2. const didUserCallbackTimeout = currentTask.expirationTime <= currentTime; 当前任务已过期
         3. const continuationCallback = callback(didUserCallbackTimeout); 执行任务
         4. pop(taskQueue); 任务执行完成，弹出此任务
         5. currentTask = peek(taskQueue); 从任务队列中再取出此任务，进行下一次循环
   4. 跳出循环后
      1. if (currentTask !== null) 说明任务还未全部执行，前面的 hasMoreWork = true，当前任务暂时停止，将主线程归还，等待后续执行
      2. taskQueue 队列清空，普通任务执行完成，调度延时任务
         1. const firstTimer = peek(timerQueue);
         2. requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
4. shouldYieldToHost（判断任务是否应该暂停）
   1. const timeElapsed = getCurrentTime() - startTime; 当前时间 - 任务开始时间 = 当前线程阻塞时间  
      1. timeElapsed < frameInterval（默认阻塞时间，5ms），当前线程阻塞时间 < 默认最小阻塞时间，此时不需要停止任务
   2. timeElapsed > frameInterval，任务已被阻塞一段时间，需要归还主线程
5. advanceTimers （遍历延时队列，将已到时间的任务放入普通任务队列）
   1. let timer = peek(timerQueue);
   2. 开启 while 循环，遍历 timerQueue
      1. if (timer.callback === null) pop(timerQueue); 如果这个任务没有callback，弹出此任务
      2. if (timer.startTime <= currentTime) 当前任务已到执行时间
         1. pop(timerQueue); timer.sortIndex = timer.expirationTime; push(taskQueue, timer); 将任务推入到 taskQueue
      3. timer = peek(timerQueue); 重新取出延时任务，进入下一次循环
      4. 如果新的延时任务不符合上述两个条件（即：有有效的执行任务，但不到执行时间），跳出此处循环
6. requestHostTimeout （调度延时任务）
   1.  requestHostTimeout(handleTimeout, startTime - currentTime);
   2. 通过 setTimeout 创建一个延时任务
```js
// ms = startTime - currentTime
taskTimeoutID = localSetTimeout(() => {
    callback(getCurrentTime());
  }, ms);
```
7. handleTimeout （时间到达，处理延时队列中的延时任务，再度开启任务调度）
   1. advanceTimers(currentTime); 遍历延时任务队列，到执行时间的延时任务，放入到taskQueue
   2. if (peek(taskQueue) !== null) requestHostCallback(flushWork); 普通任务队列有任务，进行普通任务调度
   3. 普通任务队列中无任务，同时延时任务队列中有任务，再次进入延时任务调度，requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);

## 流程简单总结

1. 计算任务对应的任务开始时间和过期时间，创建对应任务
2. 普通任务，放入普通任务队列，进行普通任务调度
   1. 执行 workLoop，内部开启 while 循环
      1. 在主线程可执行时间内，依次执行普通任务，直到主线程时间不够，需归还主线程
      2. 普通任务列表还未清空时，通过 MessageChannel 创建一个宏任务，以便本次页面更新完成后，再次执行后续任务
      3. 如果普通任务全部执行完成，延时队列还有任务，调度延时任务
3. 延时任务放入延时队列，进行延时任务调度
   1. 根据任务的执行时间，通过 setTimeout 创建一个宏任务
   2. 此宏任务内部，遍历延时队列，将已到时间的任务放入普通任务队列，进行普通任务调度
   3. 当普通任务队列清空，延时任务队列还有任务，进行下一次延时任务调度

MessageChannel 创建一个宏任务（发送一个消息，通过port监听此消息后，监听事件内部，执行普通任务，然后往复循环上面的流程）