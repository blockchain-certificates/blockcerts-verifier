import {
  Certificate,
  retrieveBlockcertsVersion
} from '@blockcerts/cert-verifier-js';
import {
  Certificate as CertificateV1,
  CertificateOptions as CertificateOptionsV1
} from '@blockcerts/cert-verifier-js-v1-legacy';
import type {
  Blockcerts,
  BlockcertsVersion,
  CertificateOptions
} from '@blockcerts/cert-verifier-js';

export interface ICertificateObject {
  certificateDefinition: Certificate | null;
  errorMessage?: string;
}

export default async function parse (definition: Blockcerts, options: CertificateOptions = {}): Promise<ICertificateObject> {
  if (!options.locale) {
    options.locale = 'auto';
  }

  try {
    const blockcertsVersion: BlockcertsVersion = retrieveBlockcertsVersion(definition['@context']);
    let certificateDefinition;
    if (blockcertsVersion.versionNumber === 1) {
      certificateDefinition = new CertificateV1(definition, options as CertificateOptionsV1);
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
