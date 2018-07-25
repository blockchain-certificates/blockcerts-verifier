import { Certificate } from 'cert-verifier-js/dist/verifier-es';

export default function validate (definition) {
  let isValid = false;
  try {
    const certificate = new Certificate(definition);
    isValid = true;

    return {
      isValid
    };
  } catch (e) {
    // console.error(e);
    return {
      isValid,
      errorMessage: 'Not a valid Blockcerts definition.'
    };
  }
}
