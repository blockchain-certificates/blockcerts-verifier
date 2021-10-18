import { Certificate, CertificateOptions, retrieveBlockcertsVersion } from '@blockcerts/cert-verifier-js';
import { Certificate as CertificateV1 } from '@blockcerts/cert-verifier-js-v1-legacy';

export interface ICertificateObject {
  certificateDefinition: Certificate | null;
  errorMessage?: string;
}

// TODO: define input type to be a valid blockcerts document definition
export default async function parse (definition: any, options: CertificateOptions = {}): Promise<ICertificateObject> {
  if (!options.locale) {
    options.locale = 'auto';
  }

  try {
    const version: number = retrieveBlockcertsVersion(definition['@context']);
    let certificateDefinition;
    if (version === 1) {
      certificateDefinition = new CertificateV1(definition, options);
    } else {
      certificateDefinition = new Certificate(definition, options);
    }
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
