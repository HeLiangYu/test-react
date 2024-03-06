export default class ListenManager {
  listeners = [];
  addListener(listener) {
    this.listeners.push(listener);
    return () => {
      const i = this.listeners.indexOf(listener);
      this.listeners.splice(i, 1);
    };
  }

  /**
   * 触发所有监听器
   * @param {*} location
   * @param {*} action
   */
  triggerListener(location, action) {
    for (const listener of this.listeners) {
      listener(location, action);
    }
  }
}
