import { Certificate } from '@blockcerts/cert-verifier-js/dist/verifier-es';

export default function parse (definition) {
  try {
    /* eslint no-new: off */
    const options = {
      locale: 'auto'
    };
    const certificateDefinition = new Certificate(definition, options);

    return {
      certificateDefinition
    };
  } catch (e) {
    // console.error(e);
    return {
      certificateDefinition: null,
      errorMessage: 'errors.invalidBlockcerts'
    };
  }
}
