class StepQueue {
  constructor (dispatchCb) {
    this.queue = [];
    this.dispatchCb = dispatchCb;
    this.isExecuting = false;
    this.intervalId = null;
    this.dispatchNext = this.dispatchNext.bind(this);
  }

  push (step) {
    this.queue.push(step);
  }

  dispatchNext () {
    const step = this.queue.shift();
    if (step) {
      this.dispatchCb(step);
    } else if (this.intervalId) {
      this.isExecuting = false;
      clearInterval(this.intervalId);
    }
  }

  execute () {
    if (!this.isExecuting && this.queue.length) {
      this.isExecuting = true;
      this.intervalId = setInterval(this.dispatchNext, 200)
    }
  }
}

export default StepQueue;
