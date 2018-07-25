import { Certificate } from 'cert-verifier-js/dist/verifier-es';

export default function validate (definition) {
  try {
    /* eslint no-new: off */
    const certificateDefinition = new Certificate(definition);

    return {
      certificateDefinition,
      isValid: true
    }
  } catch (e) {
    // console.error(e);
    return {
      certificateDefinition: null,
      errorMessage: 'Not a valid Blockcerts definition.',
      isValid: false
    };
  }
}
