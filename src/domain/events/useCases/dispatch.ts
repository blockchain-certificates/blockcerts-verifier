import type { Blockcerts } from '@blockcerts/cert-verifier-js';

 
export default function dispatch (eventType = '', certificateDefinition: Blockcerts = null, details: any): void {
  if (!eventType || typeof eventType !== 'string') {
    return;
  }

  if (!certificateDefinition || typeof certificateDefinition !== 'object') {
    return;
  }

  const event = new CustomEvent(eventType, {
    detail: {
      certificateDefinition,
      ...details
    }
  });

  window.dispatchEvent(event);
}
