import connector from '../../../store/connector';
import FullCertificate, { IFullCertificate } from './FullCertificate';
import {
  getCertificateDefinition,
  getDisplay
} from '../../../selectors/certificate';
import { getClickableUrls } from '../../../selectors/api';

export const mapStateToProps = (state): Partial<IFullCertificate> => ({
  hasCertificateDefinition: !!getCertificateDefinition(state),
  displayHTML: getDisplay(state),
  clickableUrls: getClickableUrls(state)
});

const FullCertificateContainer = connector(FullCertificate, { mapStateToProps });
export default FullCertificateContainer;
