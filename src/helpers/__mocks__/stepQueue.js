class StepQueue {
  constructor (dispatchCb) {
    this.dispatchCb = dispatchCb;
  }

  push (step) {
    this.step = step;
  }

  execute () {
    this.dispatchCb(this.step);
  }
}

export default StepQueue;
