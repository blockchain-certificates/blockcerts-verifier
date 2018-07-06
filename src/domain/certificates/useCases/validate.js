import { Certificate } from 'cert-verifier-js/verifier-es';

export default function validate (definition) {
  let isValid = false;
  try {
    isValid = !!Certificate.parseJson(definition);

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
