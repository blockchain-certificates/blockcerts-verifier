import { Certificate } from 'cert-verifier-js/dist/verifier-es';

export default async function verify (certificateDefinition, stepCb) {
  if (typeof certificateDefinition === 'string') {
    return;
  }

  const verifier = new Certificate(certificateDefinition);
  const res = await verifier.verify(stepCb);

  return res;
}
