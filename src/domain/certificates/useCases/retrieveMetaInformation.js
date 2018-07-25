import { Certificate } from 'cert-verifier-js/dist/verifier-es';

export default function retrieveMetaInformation (definition) {
  const metaInformation = new Certificate(definition);

  const { transactionLink, transactionId, chain } = metaInformation;

  return {
    transactionLink,
    transactionId,
    chain
  };
}
