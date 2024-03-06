export default class BlockManager {
  msg = null;
  getUserConfirmation = null;

  constructor(getUserConfirmation) {
    this.getUserConfirmation = getUserConfirmation;
  }

  setBlock(msg) {
    this.msg = msg;
    return () => {
      this.msg = null;
    };
  }

  triggerBlock(callback) {
    if (this.msg && this.getUserConfirmation) {
      this.getUserConfirmation(this.msg, (result) => {
        if (result) {
          callback();
        }
      });
    } else {
      callback();
    }
  }
}
