import connector from '../../../store/connector';
import type { CardCertificateProps } from './CardCertificate';
import CardCertificate from './CardCertificate';
import {
  getCertificateDefinition, getCertificateDescription,
  getCertificateTitle,
  getIssueDate,
  getIssuedOn,
  getIssuerLogo,
  getIssuerName,
  getRecipientName,
  getRecordLink
} from '../../../selectors/certificate';
import { getDisableDownloadPdf } from '../../../selectors/api';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

const mapStateToProps = (state: BlockcertsVerifierState): CardCertificateProps => ({
  hasCertificateDefinition: !!getCertificateDefinition(state),
  recipientName: getRecipientName(state),
  certificateTitle: getCertificateTitle(state),
  certificateDescription: getCertificateDescription(state),
  issueDate: getIssueDate(state),
  issuedOn: getIssuedOn(state),
  issuerName: getIssuerName(state),
  issuerLogo: getIssuerLogo(state),
  recordLink: getRecordLink(state),
  disableDownloadPdf: getDisableDownloadPdf(state)
});

const ownProps: CardCertificateProps = {
  hideRecordLink: Boolean as any,
  hideVerifyButton: Boolean as any
};

const CardCertificateContainer = connector(CardCertificate, { mapStateToProps, ownProps });
export default CardCertificateContainer;
