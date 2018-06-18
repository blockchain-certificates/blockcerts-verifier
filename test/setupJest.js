require('jest-fetch-mock');

global.MutationObserver = class {
  disconnect () {}
  observe (element, initObject) {}
};

global.customElements = {
  define: () => {}
};
