import { Certificate } from 'cert-verifier-js/verifier-es';

export default function parseDefinition (definition) {
  return Certificate.parseJson(definition);
}
