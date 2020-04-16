import { Certificate } from '@blockcerts/cert-verifier-js/dist/verifier-es';

export default async function parse (definition, options = {}) {
  if (!options.locale) {
    options.locale = 'auto';
  }

  try {
    /* eslint no-new: off */
    const certificateDefinition = new Certificate(definition, options);
    await certificateDefinition.init();

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
