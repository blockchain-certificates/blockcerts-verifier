import { Certificate } from 'cert-verifier-js/verifier-es';

export default function retrieveMetaInformation (definition) {
  const metaInformation = Certificate.parseJson(definition);

  const { transactionLink, transactionId, chain } = metaInformation;

  return {
    transactionLink,
    transactionId,
    chain
  };
}
