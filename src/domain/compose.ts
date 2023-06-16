import proxyPolyfill from '../polyfills/proxy-polyfill';

// Proxy handler to intercept property calls
const handler: any = {
  get: (target: any, name: string): any => {
    const result = name in target
      ? target[name]
      : null;
    if (!result) console.warn('the service does not exist', name);
    return result;
  }
};

const compose = (services = {}): any => {
  // Creates a domain object enhanced with the proxy handler
  if (!window.Proxy) {
    const ProxyPolyfill = proxyPolyfill();
    // @ts-expect-error this code from js works so not going to start modifying stuff for TS satisfaction
    return new ProxyPolyfill(services, handler);
  }
  return new Proxy(services, handler);
};

export default compose;
