import crypto from 'crypto';
require('jest-fetch-mock');

global.MutationObserver = class {
  disconnect () {}
  observe (element, initObject) {}
};

global.customElements = {
  define: () => {}
};

Object.defineProperty(global.self, 'crypto', {
  value: {
    // use node 15.x
    subtle: crypto.webcrypto.subtle,
    getRandomValues: () => new Uint32Array(10)
  }
});

global.Image = class {
  constructor () {
    setTimeout(() => {
      this.width = 100;
      this.height = 100;
      this.onload();
    }, 100);
  }
};
