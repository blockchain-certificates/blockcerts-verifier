import { Certificate } from 'cert-verifier-js/dist/verifier-es';

export default function parse (definition) {
  try {
    /* eslint no-new: off */
    const certificateDefinition = new Certificate(definition);

    return {
      certificateDefinition
    };
  } catch (e) {
    // console.error(e);
    return {
      certificateDefinition: null,
      errorMessage: 'Not a valid Blockcerts definition.'
    };
  }
}
