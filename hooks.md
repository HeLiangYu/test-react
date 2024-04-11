## hooks 流程

hook存储结构
```js
const hook = {
    memoizedState: null, // Hook 自身维护的状态

    baseState: null,
    baseQueue: null,
    queue: null, // Hook 自身维护的更新队列

    next: null, // next 指向下一个 Hook
};

const queue = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState,
};

hook.queue = queue;
``` 

1. renderWithHooks（FC 进入到 render 阶段时，会调用此函数）
   1. workInProgress.memoizedState = null；清空 hook 链表
   2. workInProgress.updateQueue；清空 effect 链表
   3. mount 时用 HooksDispatcherOnMount 对象，update 执行 HooksDispatcherOnUpdate
   4. let children = Component(props, secondArg)；执行函数组件，所有的 hooks 将依次执行
   5. return children;
2. 拿到当前hook对象
   1. mount：mountWorkInProgressHook
      1. 创建一个 hook 对象
      2. 如果是第一个 hook，当前 Fiber 的 memoizedState = hook 
      3. workInProgressHook = hook
      4. 如果不是第一个hook，workInProgressHook = workInProgressHook.next = hook；前一个 hook 的 next 指向当前的 hook，当前运行的 hook 指向当前的 hook
   2. update：updateWorkInProgressHook
      1. 函数组件的第一个 hook，从之前的 Fiber 获取到第一个 hook 对象：const current = currentlyRenderingFiber.alternate；（从 alternate 得到 Fiber对象）
      2. 非第一个 hook，nextWorkInProgressHook = workInProgressHook.next
      3. workInProgressHook = nextWorkInProgressHook; nextWorkInProgressHook = workInProgressHook.next; currentHook = nextCurrentHook;复用之前的 hook 对象
3. 设置/复用 hook 的属性（useState）
   1. mount
      1. hook.memoizedState = hook.baseState = initialState；设置 hook 的 memoizedState 为传入的初始值
      2. return [hook.memoizedState, dispatch]；返回当前状态和更新函数
   2. update
      1. const queue = hook.queue; const dispatch = queue.dispatch;
      2. return [hook.memoizedState, dispatch];

总结：

1. 每次 render ，清空所有状态
2. mount：创建 hook 对象，根据 hook 的不同，在 hook.memoizedState 存入不同信息
3. update：获取之前的 hook 对象，复用之前的 hook 对象；根据 hook 不同，做不同的更新操作

## useState 和 useReducer

### useState

1. mount：根据传入的初始值，将其存入到 hook.memoizedState 中，创建 queue.dispatch 函数，创建对应的 hook 对象，最终返回 [hook.memoizedState, queue.dispatch]
2. update：复用之前的 hook 对象，使用内部的 reducer 更新 state，更新 hook 对象，最终返回新的 [hook.memoizedState, queue.dispatch]

### useReducer

1. mount：根据传入的 reducer，initState，hook.memoizedState = initState，queue.lastRenderedReducer = reducer，queue.dispatch，创建 hook 对象，最终返回 [hook.memoizedState, dispatch]
2. update：复用之前的 hook 对象，queue.lastRenderedReducer = reducer; const dispatch = queue.dispatch; 最终返回 [hook.memoizedState, dispatch];

## effect

### 声明阶段

1. mount
   1. 保存依赖数组
   2. 保存 effect 创建函数
   3. currentlyRenderingFiber.flags |= fiberFlags; 修改当前 Fiber 的 flag，在组件渲染完成后，会执行此 effect 函数，执行完成得到 effect 清除函数，存入到memoizedState.destroy
   4. 设置 hook 对象的 memoizedState，即将 effect 创建函数、依赖数组保存到此属性
2. update
   1. 拿到之前的 effect 执行完成之后返回的函数，即：清除函数
   2. 新的依赖性和老的依赖性进行对比
      1. 若值都相同，即依赖没有变化，给此 effect 打上 tag，在组件渲染完后跳过这个 effect 的执行
      2. 值有不同，依赖发生变化
         1. currentlyRenderingFiber.flags |= fiberFlags; 
         2. 修改 Fiber 的 flag，在 commit 节点后，会再次执行此 effect
         3. 重新设置 hook.memoizedState，保存新的 effect 创建函数、destroy、依赖数组

总结

1. 声明阶段，hook.memoizedState 对象上存储 effect 创建函数、依赖数组；
2. update 时，会将之前的 effect 依赖数组与新的依赖数组数据进行对比，依赖未变化，给 effect hook 打上tag，重新创建新的 hook.memoizedState，后续将忽略此函数的执行；依赖变化，打上 effect 的tag，重新创建 hook.memoizedState
3. 调度阶段，以某一优先级调度 useEffect 函数的执行函数；另，为保证下一次 commit 执行前，上一次 commit 所调度的 useEffect 都已执行，会在 commit 阶段入口处，会循环执行 useEffect 执行函数
4. 执行阶段，先遍历执行 effect.destroy 函数，再遍历执行 effect 创建函数，根据声明阶段依赖是否变化打的 tag 决定是否执行该 effect

## useCallback 和 useMemo

### useCallback

1. mount：
   1. 创建 hook 对象
   2. 存储 callback 和依赖数组，hook.memoizedState = [callback, nextDeps]; 
   3. 返回缓存函数 return callback;
2. update：
   1. 复用之前的 hook 对象，
   2. 之前的依赖项和新的依赖项进行对比，若依赖变化，重新缓存函数和依赖，hook.memoizedState = [callback, nextDeps]；
   3. 最终返回缓存函数 return callback;

### useMemo

1. mount：
   1. 创建 hook 对象
   2. 执行传入的函数：const nextValue = nextCreate();
   3. 缓存函数执行结果和依赖，hook.memoizedState = [nextValue, nextDeps];
   4. 最终返回函数执行的结果：return nextValue;
2. update：
   1. 获取之前的 hook 对象
   2. 对比之前的依赖和现在的依赖，若发生变化，重新执行传入的函数，const nextValue = nextCreate();
   3. 重新缓存函数执行结果和依赖，hook.memoizedState = [nextValue, nextDeps];
   4. 最终返回函数执行的结果：return nextValue;