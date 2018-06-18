require('jest-fetch-mock');

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

global.customElements = {
  define: () => {}
};
