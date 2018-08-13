function getCertificateId (certificateDefinition) {
  return certificateDefinition.id;
}

export default function dispatch (eventType = '', certificateDefinition = null, details) {
  if (!eventType || typeof eventType !== 'string') {
    return;
  }

  if (!certificateDefinition || typeof certificateDefinition !== 'object') {
    return;
  }

  const event = new CustomEvent(eventType, { detail: {
    uid: getCertificateId(certificateDefinition),
    ...details
  }});

  window.dispatchEvent(event);
}
