import { createBrowserHistory as historyCreateBrowserHistory } from "history";
import ListenManager from "./ListenManager";
import BlockManager from "./BlockManager";

const globalHistory = window.history;
const globalLocation = window.location;

window.h = historyCreateBrowserHistory();
export default function createBrowserHistory(options = {}) {
  const {
    basename = "",
    forceRefresh = false,
    keyLength = 6,
    getUserConfirmation = null,
  } = options;
  const listenerManager = new ListenManager();
  const blockManager = new BlockManager(getUserConfirmation);

  function go(delta) {
    globalHistory.go(delta);
  }

  function goBack() {
    globalHistory.back();
  }

  function goForward() {
    globalHistory.forward();
  }

  function changePage(path, state, type) {
    const pathInfo = handlePathAndState(path, state, basename);
    const changeState = {
      key: createKey(keyLength),
      state: pathInfo.state,
    };
    let action;

    // 处理阻塞
    blockManager.triggerBlock(() => {
      if (type === "push") {
        globalHistory.pushState(changeState, null, pathInfo.path);
        action = "PUSH";
      } else {
        globalHistory.replaceState(changeState, null, pathInfo.path);
        action = "REPLACE";
      }

      if (forceRefresh) {
        globalLocation.href = pathInfo.path;
      }

      const location = createLocation(basename);
      historyObj.location = location;
      historyObj.length = globalHistory.length;
      historyObj.action = action;

      listenerManager.triggerListener(location, action);
    });
  }

  function replace(path, state) {
    changePage(path, state, "replace");
  }

  function push(path, state) {
    changePage(path, state, "push");
  }

  window.listenerManager = listenerManager;

  /**
   * 对地址变化监听
   */
  function addDomListener() {
    window.addEventListener("popstate", (e) => {
      blockManager.triggerBlock(() => {
        const newAction = createLocation(basename);

        listenerManager.triggerListener(newAction, "POP");
        historyObj.action = newAction;
      });
    });
  }

  addDomListener();

  function listen(listener) {
    return listenerManager.addListener(listener);
  }

  function block(msg) {
    return blockManager.setBlock(msg);
  }

  function createHref(location) {
    const { pathname = "/", search = "", hash = "" } = location;
    return basename + pathname + search + hash;
  }

  const historyObj = {
    action: "POP",
    location: createLocation(basename),
    length: globalHistory.length,
    go,
    goBack,
    goForward,
    push,
    replace,
    listen,
    block,
    createHref,
  };

  return historyObj;
}

/**
 * 产生一个指定长度的随机字符串，随机字符串中可以包含数字和字母
 * @param {*} keyLength
 */
function createKey(keyLength = 6) {
  return Math.random().toString(36).substr(2, keyLength);
}

function handlePathAndState(path, state, basename = "") {
  if (typeof path === "string") {
    return {
      path: basename + (path.charAt(0) !== "/" ? "/" : "") + path,
      state,
    };
  } else if (typeof path === "object") {
    let { hash = "", search = "", pathname = "", state: newState } = path;
    hash = hash && hash.charAt(0) !== "#" ? "#" + hash : hash;
    search = search && search.charAt(0) !== "?" ? "?" + search : search;
    pathname = (pathname.charAt(0) !== "/" ? "/" : "") + pathname;

    return {
      path: basename + pathname + search + hash,
      state: newState,
    };
  } else {
    throw new TypeError("path must be string or object");
  }
}

function createLocation(basename = "") {
  const { pathname: historyPathname, hash, search } = globalLocation;

  const pathname = historyPathname.replace(new RegExp(`^${basename}`), "");
  const location = {
    hash,
    pathname,
    search,
  };

  const { state: historyState } = globalHistory;
  let state;
  if (historyState) {
    if (typeof historyState !== "object") {
      // state不是对象的情况不是通过自己的history操作的，将值直接拿过来使用
      state = historyState;
    } else {
      if ("key" in historyState) {
        // 有key值的存在，说明是通过自己的history操作的
        // 把key值拿过来
        location.key = historyState.key;
        state = historyState.state;
      } else {
        state = historyState;
      }
    }
  }

  location.state = state;
  return location;
}
