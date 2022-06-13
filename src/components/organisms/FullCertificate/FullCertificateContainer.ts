import connector from '../../../store/connector';
import FullCertificate, { IFullCertificate } from './FullCertificate';
import {
  getCertificateDefinition,
  getDisplayAsHTML
} from '../../../selectors/certificate';
import { getClickableUrls } from '../../../selectors/api';

export const mapStateToProps = (state): Partial<IFullCertificate> => ({
  hasCertificateDefinition: !!getCertificateDefinition(state),
  displayHTML: getDisplayAsHTML(state),
  clickableUrls: getClickableUrls(state)
});

const FullCertificateContainer = connector<any, Partial<IFullCertificate>, any>(
  FullCertificate,
  { mapStateToProps }
);
export default FullCertificateContainer;
