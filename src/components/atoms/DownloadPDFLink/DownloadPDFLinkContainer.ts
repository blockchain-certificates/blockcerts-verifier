import connector from '../../../store/connector';
import type { IDownloadPDFLinkApi } from './DownloadPDFLink';
import DownloadPDFLink from './DownloadPDFLink';
import {
  getCertificateDefinition,
  getIsGeneratingPDF
} from '../../../selectors/certificate';
import downloadPDF from '../../../actions/downloadPDF';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

export const mapDispatchToProps = {
  onClick: downloadPDF
};

export const mapStateToProps = (state: BlockcertsVerifierState): IDownloadPDFLinkApi => ({
  isVisible: !!getCertificateDefinition(state),
  isGeneratingPDF: getIsGeneratingPDF(state)
});

const ownProps = {
  display: String
};

const DownloadPDFLinkContainer = connector(
  DownloadPDFLink,
  { mapDispatchToProps, mapStateToProps, ownProps }
);
export default DownloadPDFLinkContainer;
