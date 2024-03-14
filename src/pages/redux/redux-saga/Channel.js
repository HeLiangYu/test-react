export default class Channel {
  listeners = {};
  take(type, fn) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(fn);
  }

  put(type, ...args) {
    const funcs = this.listeners[type];
    if (funcs) {
      delete this.listeners[type];

      funcs.forEach((fn) => {
        fn(...args);
      });
    }
  }
}
