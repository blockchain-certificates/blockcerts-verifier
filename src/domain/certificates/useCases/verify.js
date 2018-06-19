import { CertificateVerifier } from 'cert-verifier-js/lib';

export default function verify (certificateDefinition) {
  console.log(certificateDefinition);
  const verifier = new CertificateVerifier();
  console.log(verifier);
}
