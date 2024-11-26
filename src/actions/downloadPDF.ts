import updateIsGeneratingPDF from './updateIsGeneratingPDF';
import {
  getCertificateTitle,
  getDisplayContentFromState,
  getDisplayContentEncodingFromState,
  getDisplayContentTypeFromState,
  getIssueDate,
  getIssuerLogo,
  getIssuerName, getIssuerProfileDomain, getIssuerProfileUrl,
  getIssuerPublicKey,
  getRecipientName,
  getRecordLink
} from '../selectors/certificate';
import type { CONTENT_MEDIA_TYPES } from '../constants/contentTypes';
import type { Dispatch } from 'redux';
import type { BlockcertsVerifierState } from '../store/getInitialState';

export default function downloadPDF () {
  return async function (dispatch: Dispatch, getState: () => BlockcertsVerifierState): Promise<void> {
    const state = getState();

    const { default: downloadPDF } = await import('../domain/certificates/useCases/downloadPDF');

    const contentType: CONTENT_MEDIA_TYPES = getDisplayContentTypeFromState(state);
    const contentEncoding: string = getDisplayContentEncodingFromState(state);
    const content: string = getDisplayContentFromState(state);
    const recipientName: string = getRecipientName(state);
    const certificateTitle: string = getCertificateTitle(state);
    const issueDate: string = getIssueDate(state);
    const issuerName: string = getIssuerName(state);
    const issuerLogo: string = getIssuerLogo(state);
    const recordLink: string = getRecordLink(state);
    const issuerPublicKey: string[] = getIssuerPublicKey(state);
    const issuerProfileUrl: string[] = getIssuerProfileUrl(state);
    const issuerProfileDomain: string[] = getIssuerProfileDomain(state);

    dispatch(updateIsGeneratingPDF(true));

    await downloadPDF({
      contentType,
      contentEncoding,
      content,
      recipientName,
      certificateTitle,
      issueDate,
      issuerName,
      issuerLogo,
      recordLink,
      issuerPublicKey,
      issuerProfileUrl,
      issuerProfileDomain
    });

    dispatch(updateIsGeneratingPDF(false));
  };
}
