import connector from '../../../store/connector';
import Footer, { FooterProps } from './Footer';
import { getTheme } from '../../../selectors/api';
import { BlockcertsVerifierState } from '../../../store/getInitialState';

const mapStateToProps = (state: BlockcertsVerifierState): FooterProps => ({
  theme: getTheme(state)
});

const ownProps: FooterProps = {
  forceInPlace: Boolean as any,
  interactive: Boolean as any
};

const FooterContainer = connector(Footer, { mapStateToProps, ownProps });
export default FooterContainer;
