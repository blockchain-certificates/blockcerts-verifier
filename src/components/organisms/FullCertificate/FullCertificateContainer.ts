import connector from '../../../store/connector';
import { FullCertificate, IFullCertificateAPI } from './FullCertificate';
import {
  getCertificateDefinition,
  getDisplayAsHTML
} from '../../../selectors/certificate';
import { getClickableUrls } from '../../../selectors/api';
import { BlockcertsVerifierState } from '../../../store/getInitialState';

export const mapStateToProps = (state: BlockcertsVerifierState): Partial<IFullCertificateAPI> => ({
  hasCertificateDefinition: !!getCertificateDefinition(state),
  displayHTML: getDisplayAsHTML(state),
  clickableUrls: getClickableUrls(state)
});

const FullCertificateContainer = connector<any, Partial<IFullCertificateAPI>, any>(
  FullCertificate,
  { mapStateToProps }
);
export default FullCertificateContainer;
