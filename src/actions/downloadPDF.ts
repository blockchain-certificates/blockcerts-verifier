import domain from '../domain';
import isGeneratingPDF from './isGeneratingPDF';
import {
  getCertificateTitle,
  getDisplayContent,
  getDisplayContentEncoding,
  getDisplayContentType,
  getIssueDate,
  getIssuerLogo,
  getIssuerName, getIssuerProfileDomain, getIssuerProfileUrl,
  getIssuerPublicKey,
  getRecipientName,
  getRecordLink
} from '../selectors/certificate';
import { CONTENT_TYPES } from '../constants/contentTypes';

export default function downloadPDF () {
  return async function (dispatch, getState) {
    const state = getState();

    const contentType: CONTENT_TYPES = getDisplayContentType(state);
    const contentEncoding: string = getDisplayContentEncoding(state);
    const content: string = getDisplayContent(state);
    const recipientName: string = getRecipientName(state);
    const certificateTitle: string = getCertificateTitle(state);
    const issueDate: string = getIssueDate(state);
    const issuerName: string = getIssuerName(state);
    const issuerLogo: string = getIssuerLogo(state);
    const recordLink: string = getRecordLink(state);
    const issuerPublicKey: string[] = getIssuerPublicKey(state);
    const issuerProfileUrl: string[] = getIssuerProfileUrl(state);
    const issuerProfileDomain: string[] = getIssuerProfileDomain(state);

    dispatch(isGeneratingPDF(true));

    await domain.certificates.downloadPDF({
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

    dispatch(isGeneratingPDF(false));
  };
}
