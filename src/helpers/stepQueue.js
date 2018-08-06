class StepQueue {
  constructor () {
    this.queue = [];
    this.dispatchCb = null;
    this.isExecuting = false;
    this.intervalId = null;
    this.dispatchNext = this.dispatchNext.bind(this);
  }

  registerCb (dispatchCb) {
    this.dispatchCb = dispatchCb;
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
      this.intervalId = setInterval(this.dispatchNext, 200);
    }
  }
}

const stepQueueFactory = () => {
  return new StepQueue();
};

export default stepQueueFactory;
