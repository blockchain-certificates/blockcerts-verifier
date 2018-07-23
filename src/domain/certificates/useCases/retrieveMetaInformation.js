import { Certificate } from 'cert-verifier-js/verifier-es';

// TODO: rename this to `parseDefinition`
export default function retrieveMetaInformation (definition) {
  return Certificate.parseJson(definition);
}
