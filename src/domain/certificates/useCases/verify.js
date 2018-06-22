import { CertificateVerifier } from 'cert-verifier-js';

export default async function verify (certificateDefinition) {
  const certificateAsString = JSON.stringify(certificateDefinition);
  const verifier = new CertificateVerifier(certificateAsString, (step, status, message) => {
    console.log('stepCode', step);
    console.log('status', status);
    console.log('message', message);
  });
  const res = await verifier.verify((stepCode, status, message) => {
    console.log('** done **');
    console.log('stepCode', stepCode);
    console.log('status', status);
    console.log('message', message);
  });
  console.log(res);
}
