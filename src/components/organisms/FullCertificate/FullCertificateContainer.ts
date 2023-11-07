import connector from '../../../store/connector';
import type { IFullCertificateAPI } from './FullCertificate';
import { FullCertificate } from './FullCertificate';
import {
  getCertificateDefinition,
  getDisplayAsHTML
} from '../../../selectors/certificate';
import { getClickableUrls } from '../../../selectors/api';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

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
