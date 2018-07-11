import { Certificate } from 'cert-verifier-js/verifier-es';

export default function retrieveMetaInformation (definition) {
  const metaInformation = Certificate.parseJson(definition);

  const { transactionLink, chain } = metaInformation;

  return {
    transactionLink,
    chain
  };
}
