import { Certificate } from 'cert-verifier-js/dist/verifier-es';

export default function parseDefinition (definition) {
  return new Certificate(definition);
}
