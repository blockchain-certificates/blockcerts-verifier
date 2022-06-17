import connector from '../../../store/connector';
import DownloadPDFLink from './DownloadPDFLink';
import {
  getCertificateDefinition,
  getIsGeneratingPDF
} from '../../../selectors/certificate';
import downloadPDF from '../../../actions/downloadPDF';

export const mapDispatchToProps = {
  onClick: downloadPDF
};

export const mapStateToProps = (state) => ({
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
