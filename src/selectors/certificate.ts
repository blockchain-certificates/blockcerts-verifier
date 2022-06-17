import domain from '../domain';
import sanitize from '../../sanitizer/sanitizer';
import getDateFormat from '../i18n/getDateFormat';
import { isValidUrl } from '../helpers/validations';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';
import type { IVerificationMapItem, Signers, Certificate } from '@blockcerts/cert-verifier-js';
import { CONTENT_TYPES } from '../constants/contentTypes';

export function getCertificateDefinition (state): Certificate {
  return state.certificateDefinition;
}

export function getSigners (state): Signers[] {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.signers;
  }

  return [];
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

export function getDisplayContentType (state): CONTENT_TYPES | null {
  const certificateDefinition = getCertificateDefinition(state);

  if (!certificateDefinition) {
    return null;
  }

  if ('displayHtml' in certificateDefinition.certificateJson) {
    return CONTENT_TYPES.TEXT_HTML;
  }

  return certificateDefinition.display?.contentMediaType as CONTENT_TYPES;
}

export function getDisplayContentEncoding (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (!certificateDefinition) {
    return '';
  }

  if ('displayHtml' in certificateDefinition.certificateJson) {
    return '';
  }

  return certificateDefinition.display?.contentEncoding;
}

export function getDisplayContent (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (!certificateDefinition) {
    return '';
  }

  if ('displayHtml' in certificateDefinition.certificateJson) {
    return certificateDefinition.certificateJson.displayHtml;
  }

  return certificateDefinition.display?.content ?? '';
}

export function getDisplayAsHTML (state): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (!certificateDefinition) {
    return '';
  }

  // V2 concern
  const { displayHtml } = (certificateDefinition as any).certificateJson;
  if (displayHtml) {
    return sanitize(displayHtml);
  }

  const display = certificateDefinition.display;

  if (display) {
    switch (display.contentMediaType) {
      case CONTENT_TYPES.TEXT_HTML:
        return sanitize(display.content);

      case CONTENT_TYPES.IMAGE_PNG:
      case CONTENT_TYPES.IMAGE_JPEG:
      case CONTENT_TYPES.IMAGE_GIF:
      case CONTENT_TYPES.IMAGE_BMP:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `<img src="data:${display.contentMediaType};${display.contentEncoding},${display.content}"/>`;

      case CONTENT_TYPES.APPLICATION_PDF:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `<embed width="100%" height="100%" type="application/pdf" src="data:${display.contentMediaType};${display.contentEncoding},${display.content}"/>`;

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

export function getMetadata (state): any { // we cannot know in advance the shape of the metadata as it's specific to each cert
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

export function getTransactionLink (state): string[] {
  const signers = getSigners(state);
  if (signers.length === 0) {
    return getV1Property(state, 'transactionLink') ?? [];
  }
  return signers.map(signer => signer.transactionLink);
}

export function getTransactionId (state): string[] {
  const signers = getSigners(state);
  if (signers.length === 0) {
    return getV1Property(state, 'transactionId') ?? [];
  }
  return signers.map(signer => signer.transactionId);
}

export function getChain (state): string[] {
  const signers = getSigners(state);
  if (signers.length === 0) {
    const chain = getV1Property(state, 'chain');
    return chain ? chain.map(chain => chain?.name) : [];
  }
  return signers.map(signer => signer.chain?.name);
}

export function isTestChain (state): boolean {
  const chains = getChain(state);
  return chains.some(chain => chain === 'Mocknet' || chain?.includes('Testnet'));
}

export function isTestChainAtIndex (state, index: number): boolean {
  const chains = getChain(state);
  const chain = chains[index];
  if (!chain) {
    return false;
  }
  return chain === 'Mocknet' || chain.includes('Testnet');
}

export function getVerifiedSteps (state): IVerificationMapItem[] {
  return state.verifiedSteps || [];
}

export function getParentStep (state, parentStepCode): IVerificationMapItem {
  return getVerifiedSteps(state).find(step => step.code === parentStepCode);
}

export function getStartedVerificationSteps (state): IVerificationMapItem[] {
  const verifiedSteps = getVerifiedSteps(state);

  return verifiedSteps.filter(step => step.status !== VERIFICATION_STATUSES.DEFAULT);
}

export function getHasError (state): boolean {
  return getVerifiedSteps(state).some(s => s.status === VERIFICATION_STATUSES.FAILURE);
}

export function getFinalStep (state): any { // TODO: define step -- retrieve from CVJS?
  return state.finalStep;
}

export function getIssuerPublicKey (state): string[] {
  const signers = getSigners(state);
  return signers.map(signer => signer.issuerPublicKey);
}

export function getIssuerProfileUrl (state): string[] {
  const signers = getSigners(state);
  return signers.map(signer => signer.issuerProfileUrl);
}

export function getIssuerProfileDomain (state): string[] {
  const signers = getSigners(state);
  return signers.map(signer => signer.issuerProfileDomain);
}

export function getSignatureSuiteType (state): string[] {
  const signers = getSigners(state);
  return signers.map(signer => signer.signatureSuiteType);
}

export function getSignatureSigningDate (state): string[] {
  const signers = getSigners(state);
  return signers.map(signer => signer.signingDate);
}

/* V1 SPECIFIC */
function getV1Property (state, property: string): any[] {
  const certificateDefinition = getCertificateDefinition(state);
  if (certificateDefinition) {
    return [certificateDefinition[property]];
  }

  return null;
}

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
    return (certificateDefinition as any).signatureImage;
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

export function getIsGeneratingPDF (state): boolean {
  return state.isGeneratingPDF;
}
