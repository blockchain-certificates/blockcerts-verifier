import domain from '../domain';
import sanitize from '../../sanitizer/sanitizer';
import getDateFormat from '../i18n/getDateFormat';
import { isValidUrl } from '../helpers/validations';
import { VERIFICATION_STATUSES } from '../constants/verificationStatuses';
import { CONTENT_TYPES } from '../constants/contentTypes';
import getText from '../i18n/getText';
import type { IVerificationMapItem, Signers, Certificate } from '@blockcerts/cert-verifier-js';
import type { BlockcertsVerifierState, IFinalStep } from '../store/getInitialState';
import type { V1Signature } from '../models/V1Signature';

export function getCertificateDefinition (state: BlockcertsVerifierState): Certificate {
  return state.certificateDefinition;
}

export function getSigners (state: BlockcertsVerifierState): Signers[] {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.signers;
  }

  return [];
}

export function getIssuedOn (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.issuedOn;
  }

  return '';
}

export function getIssueDate (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return getDateFormat(getIssuedOn(state));
  }

  return '';
}

export function getRecipientName (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.recipientFullName;
  }

  return '';
}

export function getCertificateTitle (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.name;
  }

  return '';
}

export function getIssuerName (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.issuer.name;
  }

  return '';
}

export function getIssuerLogo (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.issuer.image;
  }

  return '';
}

export function getDisplayContentType (state: BlockcertsVerifierState): CONTENT_TYPES | null {
  const certificateDefinition = getCertificateDefinition(state);

  if (!certificateDefinition) {
    return null;
  }

  if ('displayHtml' in certificateDefinition.certificateJson) {
    return CONTENT_TYPES.TEXT_HTML;
  }

  return certificateDefinition.display?.contentMediaType as CONTENT_TYPES;
}

export function getDisplayContentEncoding (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (!certificateDefinition) {
    return '';
  }

  if ('displayHtml' in certificateDefinition.certificateJson) {
    return '';
  }

  return certificateDefinition.display?.contentEncoding;
}

export function getDisplayContent (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (!certificateDefinition) {
    return '';
  }

  if ('displayHtml' in certificateDefinition.certificateJson) {
    return certificateDefinition.certificateJson.displayHtml;
  }

  return certificateDefinition.display?.content ?? '';
}

export function getV1DisplayHtml (state: BlockcertsVerifierState): string {
  const certificateImage = getCertificateImage(state);
  const certificateTitle = getCertificateTitle(state);
  const certificateSubtitle = getCertificateSubtitle(state);
  const certificateDescription = getCertificateDescription(state);
  const certificateSeal = getCertificateSeal(state);
  const certificateSignatures = getCertificateSignatures(state);
  const recipientName = getRecipientName(state);
  const issuerName = getIssuerName(state);
  const signatureList = certificateSignatures.map(signature => `
    <li class='buv-c-full-certificate-signatures__signature'>
        <img class='buv-c-full-certificate-img--secondary' src='${signature.image}' alt='${getText('text.signed')} ${signature.jobTitle}'/>
        ${signature.jobTitle ? `<span class='buv-o-text-12'>${signature.jobTitle}</span>` : ''}
    </li>
  `);

  let htmlString = '';

  if (certificateImage) {
    htmlString += `<img class='buv-c-full-certificate-img' src='${certificateImage}' alt='${certificateTitle}'/>`;
  }

  htmlString += `
    <div class="buv-c-full-certificate__titles">
        ${recipientName ? `<h1 class='buv-c-full-certificate__title  buv-c-full-certificate__title--name'>${recipientName}</h1>` : ''}
        ${certificateTitle ? `<h2 class='buv-c-full-certificate__title  buv-c-full-certificate__title--main'>${certificateTitle}</h2>` : ''}
        ${certificateSubtitle ? `<h3 class='buv-c-full-certificate__title  buv-c-full-certificate__title--sub'>${certificateSubtitle}</h3>` : ''}
    </div>
  `;

  if (certificateDescription) {
    htmlString += `<p class='buv-c-full-certificate__description'>${certificateDescription}</p>`;
  }

  if (signatureList.length) {
    htmlString += `
      <ul class='buv-c-full-certificate-signatures'>
        ${signatureList.join('\n')}
      </ul>
    `;
  }

  if (certificateSeal) {
    htmlString += `<img class='buv-c-full-certificate-img--secondary' src='${certificateSeal}' alt='${getText('text.certified')} ${issuerName}'/>`;
  }

  return htmlString;
}

export function getDisplayAsHTML (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (!certificateDefinition) {
    return '';
  }

  // V2 concern
  const { displayHtml } = (certificateDefinition as any).certificateJson;
  if (displayHtml) {
    return sanitize(displayHtml);
  }

  // V3
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

  // V1
  return getV1DisplayHtml(state);
}

export function getRecordLink (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition && isValidUrl(certificateDefinition.recordLink)) {
    return certificateDefinition.recordLink;
  }

  return '';
}

export function getDownloadLink (state: BlockcertsVerifierState): string {
  const url = getRecordLink(state);

  if (url) {
    return domain.certificates.download(url);
  }

  return '';
}

export function getMetadata (state: BlockcertsVerifierState): any { // we cannot know in advance the shape of the metadata as it's specific to each cert
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

export function getTransactionLink (state: BlockcertsVerifierState): string[] {
  const signers = getSigners(state);
  if (signers.length === 0) {
    return getV1Property(state, 'transactionLink') ?? [];
  }
  return signers.map(signer => signer.transactionLink);
}

export function getTransactionId (state: BlockcertsVerifierState): string[] {
  const signers = getSigners(state);
  if (signers.length === 0) {
    return getV1Property(state, 'transactionId') ?? [];
  }
  return signers.map(signer => signer.transactionId);
}

export function getChain (state: BlockcertsVerifierState): string[] {
  const signers = getSigners(state);
  if (signers.length === 0) {
    const chain = getV1Property(state, 'chain');
    return chain ? chain.map(chain => chain?.name) : [];
  }
  return signers.map(signer => signer.chain?.name);
}

export function isTestChain (state: BlockcertsVerifierState): boolean {
  const chains = getChain(state);
  return chains.some(chain => chain === 'Mocknet' || chain?.includes('Testnet'));
}

export function isTestChainAtIndex (state: BlockcertsVerifierState, index: number): boolean {
  const chains = getChain(state);
  const chain = chains[index];
  if (!chain) {
    return false;
  }
  return chain === 'Mocknet' || chain.includes('Testnet');
}

export function getVerifiedSteps (state: BlockcertsVerifierState): IVerificationMapItem[] {
  return state.verifiedSteps || [];
}

// TODO: it should refer to the VerificationSteps enum from cvjs
export function getParentStep (state: BlockcertsVerifierState, parentStepCode: string): IVerificationMapItem {
  return getVerifiedSteps(state).find(step => step.code === parentStepCode);
}

export function getStartedVerificationSteps (state: BlockcertsVerifierState): IVerificationMapItem[] {
  const verifiedSteps = getVerifiedSteps(state);

  return verifiedSteps.filter(step => step.status !== VERIFICATION_STATUSES.DEFAULT);
}

export function getHasError (state: BlockcertsVerifierState): boolean {
  return getVerifiedSteps(state).some(s => s.status === VERIFICATION_STATUSES.FAILURE);
}

export function getFinalStep (state: BlockcertsVerifierState): IFinalStep {
  return state.finalStep;
}

export function getIssuerPublicKey (state: BlockcertsVerifierState): string[] {
  const signers = getSigners(state);
  return signers.map(signer => signer.issuerPublicKey);
}

export function getIssuerProfileUrl (state: BlockcertsVerifierState): string[] {
  const signers = getSigners(state);
  return signers.map(signer => signer.issuerProfileUrl);
}

export function getIssuerProfileDomain (state: BlockcertsVerifierState): string[] {
  const signers = getSigners(state);
  return signers.map(signer => signer.issuerProfileDomain);
}

export function getSignatureSuiteType (state: BlockcertsVerifierState): string[] {
  const signers = getSigners(state);
  return signers.map(signer => signer.signatureSuiteType);
}

export function getSignatureSigningDate (state: BlockcertsVerifierState): string[] {
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

export function getCertificateImage (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.certificateImage;
  }

  return '';
}

export function getCertificateSubtitle (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.subtitle;
  }

  return '';
}

export function getCertificateDescription (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.description;
  }

  return '';
}

export function getCertificateSignatures (state: BlockcertsVerifierState): V1Signature[] {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return (certificateDefinition as any).signatureImage;
  }

  return null;
}

export function getCertificateSeal (state: BlockcertsVerifierState): string {
  const certificateDefinition = getCertificateDefinition(state);

  if (certificateDefinition) {
    return certificateDefinition.sealImage;
  }

  return '';
}

export function getIsGeneratingPDF (state: BlockcertsVerifierState): boolean {
  return state.isGeneratingPDF;
}
