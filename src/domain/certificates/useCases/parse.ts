import { Certificate, CertificateOptions } from '@blockcerts/cert-verifier-js';

export default async function parse (definition, options: CertificateOptions = {}) {
  if (!options.locale) {
    options.locale = 'auto';
  }

  try {
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
