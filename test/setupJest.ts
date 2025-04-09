import crypto from 'crypto';
import 'jest-fetch-mock';

(global as any).MutationObserver = class {
  disconnect (): void {}
  observe (element, initObject): void {}
};

Object.defineProperty(global.self, 'crypto', {
  value: {
    // use node 15.x or above
    subtle: (crypto.webcrypto as any).subtle,
    getRandomValues: () => new Uint32Array(10)
  }
});
