const stepQueueFactory = () => {
  let dispatchCb = null;
  let step = null;
  return {
    registerCb: (cb) => {
      dispatchCb = cb;
    },
    push: stepDefinition => {
      step = stepDefinition;
    },
    execute: () => {
      dispatchCb(step);
    }
  };
};

export default stepQueueFactory;
