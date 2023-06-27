import crypto from 'crypto';
require('jest-fetch-mock');

(global as any).MutationObserver = class {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect (): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  observe (element, initObject): void {}
};

Object.defineProperty(global.self, 'crypto', {
  value: {
    // use node 15.x or above
    subtle: (crypto.webcrypto as any).subtle,
    getRandomValues: () => new Uint32Array(10)
  }
});
