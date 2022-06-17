import domain from '../domain';
import isGeneratingPDF from './isGeneratingPDF';
import {
  getCertificateTitle,
  getDisplayContent,
  getDisplayContentEncoding,
  getDisplayContentType,
  getIssueDate,
  getIssuerLogo,
  getIssuerName,
  getIssuerPublicKey,
  getRecipientName,
  getRecordLink
} from '../selectors/certificate';

export default function downloadPDF () {
  return async function (dispatch, getState) {
    const state = getState();

    const contentType = getDisplayContentType(state);
    const contentEncoding = getDisplayContentEncoding(state);
    const content = getDisplayContent(state);
    const recipientName = getRecipientName(state);
    const certificateTitle = getCertificateTitle(state);
    const issueDate = getIssueDate(state);
    const issuerName = getIssuerName(state);
    const issuerLogo = getIssuerLogo(state);
    const recordLink = getRecordLink(state);
    const issuerPublicKey = getIssuerPublicKey(state);

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
      issuerPublicKey
    });

    dispatch(isGeneratingPDF(false));
  };
}
