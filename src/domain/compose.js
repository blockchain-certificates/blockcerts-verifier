// Proxy handler to intercept property calls
const handler = {
  get: (target, name) => {
    const result = name in target
      ? target[name]
      : null;
    if (!result) console.warn('the service does not exist', name);
    return result;
  }
};

const compose = (services = {}) => {
  // Creates a domain object enhanced with the proxy handler
  return new Proxy(services, handler);
};

export default compose;
