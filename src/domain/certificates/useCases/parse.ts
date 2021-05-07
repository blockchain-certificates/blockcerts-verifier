import { Certificate, CertificateOptions } from '@blockcerts/cert-verifier-js';

export interface ICertificateObject {
  certificateDefinition: Certificate | null;
  errorMessage?: string;
}

export default async function parse (definition, options: CertificateOptions = {}): Promise<ICertificateObject> {
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
    console.error(e);
    return {
      certificateDefinition: null,
      errorMessage: 'errors.invalidBlockcerts'
    };
  }
}
