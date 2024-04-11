export class SyntheticEvent {
  constructor(e) {
    this.nativeEvent = e
  }

  stopPropagation() {
    this._stopPropagation = true
    if (this.nativeEvent.stopPropagation) {
      this.nativeEvent.stopPropagation()
    }
  }
}

export const addEvent = (container, type) => {
  container.addEventListener(type, (e) => {
    dispatchEvent(e, type.toUpperCase())
  })
}

const dispatchEvent = (e, type) => {
  const se = new SyntheticEvent(e)

  const ele = e.target
  let fiber
  for (let prop in ele) {
    if (prop.toLocaleLowerCase().includes("fiber")) {
      fiber = ele[prop]
    }
  }

  const path = collectPaths(type, fiber)
  // 冒泡
  if (!se._stopPropagation) {
    triggerEventFlow(path, type, se)
  }
  // // 捕获
  // triggerEventFlow()
}

const collectPaths = (type, fiber) => {
  const paths = []
  while (fiber.tag !== 0) {
    const { memoizedProps, tag } = fiber
    type = type.toLocaleLowerCase()
    type = type.substr(0, 1).toUpperCase() + type.substr(1)
    if (tag === 5) {
      const eventName = "bind" + type
      if (memoizedProps && Object.keys(memoizedProps).includes(eventName)) {
        paths.push(memoizedProps[eventName])
      }

      fiber = fiber.return
    }
  }
  return paths
}

const triggerEventFlow = (paths, type, se) => {
  for (const callback of paths) {
    if (callback) {
      callback.call(null, se)
    }

    if (se._stopPropagation) {
      break
    }
  }
}

function calc(i) {
  if (i === 1 || i === 2) {
    return 1
  }

  return calc(i - 2) + calc(i - 1)
}
