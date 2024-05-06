import type { CertificateOptions as CertificateOptionsV1 } from '@blockcerts/cert-verifier-js-v1-legacy';
import type {
  Certificate,
  Blockcerts,
  BlockcertsVersion,
  CertificateOptions
} from '@blockcerts/cert-verifier-js';

export interface ICertificateObject {
  certificateDefinition: Certificate | null;
  errorMessage?: string;
  additionalErrorInfo?: string;
}

export default async function parse (definition: Blockcerts, options: CertificateOptions = {}): Promise<ICertificateObject> {
  if (!options.locale) {
    options.locale = 'auto';
  }

  try {
    const { retrieveBlockcertsVersion, Certificate } = await import('@blockcerts/cert-verifier-js');
    const blockcertsVersion: BlockcertsVersion = retrieveBlockcertsVersion(definition['@context']);
    let certificateDefinition;
    if (blockcertsVersion.versionNumber === 1) {
      const { Certificate: CertificateV1 } = await import('@blockcerts/cert-verifier-js-v1-legacy');
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
      errorMessage: 'errors.invalidBlockcerts',
      additionalErrorInfo: e.message
    };
  }
}
