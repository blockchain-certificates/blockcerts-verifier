import { VerificationSubstep } from '@blockcerts/cert-verifier-js';

class StepQueue {
  private readonly queue: VerificationSubstep[];
  public dispatchCb: (step: VerificationSubstep) => any;
  private isExecuting: boolean;
  private intervalId: number;

  constructor () {
    this.queue = [];
    this.dispatchCb = null;
    this.isExecuting = false;
    this.intervalId = 0;
    this.dispatchNext = this.dispatchNext.bind(this);
  }

  registerCb (dispatchCb: (step: VerificationSubstep) => any): void {
    this.dispatchCb = dispatchCb;
  }

  push (step: VerificationSubstep): void {
    this.queue.push(step);
  }

  dispatchNext (): void {
    const step = this.queue.shift();
    if (step) {
      this.dispatchCb(step);
    } else if (this.intervalId) {
      this.isExecuting = false;
      clearInterval(this.intervalId);
    }
  }

  execute (): void {
    if (!this.isExecuting && this.queue.length) {
      this.isExecuting = true;
      this.intervalId = window.setInterval(this.dispatchNext, 200);
    }
  }
}

const stepQueueFactory = (): StepQueue => {
  return new StepQueue();
};

export default stepQueueFactory;
