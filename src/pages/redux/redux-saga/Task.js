export default class Task {
  listeners = [];
  constructor(next, cbObj) {
    this.next = next;
    this.cbObj = cbObj;
    this.cbObj.callback = () => {
      this.resolve && this.resolve();
    };
  }

  addListener(fn) {
    this.listeners.push(fn);
  }

  removeListener(fn) {
    const i = this.listeners.indexOf(fn);
    if (i > -1) {
      this.listeners.splice(i, 1);
    }
  }

  cancel() {
    this.next(null, null, true);
  }

  toPromise() {
    return new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
}
