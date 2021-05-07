import VERIFICATION_STATUS from '../constants/verificationStatus';
import domain from '../domain';
import sanitize from '../../sanitizer/sanitizer';
import getDateFormat from '../i18n/getDateFormat';
import { isValidUrl } from '../helpers/validations';

export function getCertificateDefinition (state): any { // TODO: define certificate definition - retrieve from CVJS?
  return state.certificateDefinition;
}

export function getIssuedOn (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.issuedOn;
  }

  return '';
}

export function getIssueDate (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return getDateFormat(getIssuedOn(state));
  }

  return '';
}

export function getRecipientName (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.recipientFullName;
  }

  return '';
}

export function getCertificateTitle (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.name;
  }

  return '';
}

export function getIssuerName (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.issuer.name;
  }

  return '';
}

export function getIssuerLogo (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.issuer.image;
  }

  return '';
}

export function getDisplay (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (!certificateDefinition) {
    return '';
  }

  const { displayHtml, display } = certificateDefinition.certificateJson;
  if (displayHtml) {
    return sanitize(displayHtml);
  }

  if (display) {
    switch (display.contentMediaType) {
      case 'text/html':
        return sanitize(display.content);

      case 'image/png':
      case 'image/jpeg':
      case 'image/gif':
      case 'image/bmp':
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `<img src="data:${display.contentMediaType};${display.contentEncoding},${display.content}"/>`;

      default:
        return '';
    }
  }

  return '';
}

export function getRecordLink (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition && isValidUrl(certificateDefinition.recordLink)) {
    return certificateDefinition.recordLink;
  }

  return '';
}

export function getDownloadLink (state): string {
  const url = getRecordLink(state);

  if (url) {
    return domain.certificates.download(url);
  }

  return '';
}

export function getMetadataJson (state): any { // TODO: define metadataJson - retrieve from CVJS?
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    try {
      return JSON.parse(certificateDefinition.metadataJson);
    } catch (e) {
      return null;
    }
  }

  return null;
}

export function getTransactionLink (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.transactionLink;
  }

  return '';
}

export function getTransactionId (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.transactionId;
  }

  return '';
}

export function getChain (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    const { chain } = certificateDefinition;
    return chain.name;
  }

  return '';
}

export function isTestChain (state): boolean {
  const chain = getChain(state);

  return chain === 'Mocknet' || chain.includes('Testnet');
}

export function getVerifiedSteps (state): any { // TODO: define verifiedSteps -- retrieve from CVJS?
  return state.verifiedSteps || [];
}

export function getParentStep (state, parentStepCode): any { // TODO: define step -- retrieve from CVJS?
  return getVerifiedSteps(state).find(step => step.code === parentStepCode);
}

export function getStartedVerificationSteps (state): any { // TODO: define verification steps -- retrieve from CVJS?
  const verifiedSteps = getVerifiedSteps(state);

  return verifiedSteps.filter(step => step.status !== VERIFICATION_STATUS.DEFAULT);
}

export function getHasError (state): boolean {
  return getVerifiedSteps(state).some(s => s.status === VERIFICATION_STATUS.FAILURE);
}

/* V1 SPECIFIC */
export function getCertificateImage (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.certificateImage;
  }

  return '';
}

export function getCertificateSubtitle (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.subtitle;
  }

  return '';
}

export function getCertificateDescription (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.description;
  }

  return '';
}

export function getCertificateSignatures (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.signatureImage;
  }

  return '';
}

export function getCertificateSeal (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.sealImage;
  }

  return '';
}

export function getFinalStep (state): any { // TODO: define step -- retrieve from CVJS?
  return state.finalStep;
}

export function getIssuerPublicKey (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.certificateJson.verification.publicKey;
  }

  return '';
}
