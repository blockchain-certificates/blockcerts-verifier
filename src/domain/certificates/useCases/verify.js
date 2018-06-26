import { CertificateVerifier } from 'cert-verifier-js/verifier-es';

export default async function verify (certificateDefinition, stepCb, finishCb) {
  if (typeof certificateDefinition === 'string') {
    return;
  }
  const certificateAsString = JSON.stringify(certificateDefinition);
  const verifier = new CertificateVerifier(certificateAsString, stepCb);
  const res = await verifier.verify(finishCb);

  return res;
}
