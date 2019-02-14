import connector from '../../../store/connector';
import Footer from './Footer';
import { getTheme } from '../../../selectors/api';

const mapStateToProps = (state) => ({
  theme: getTheme(state)
});

const ownProps = {
  forceInPlace: Boolean,
  interactive: Boolean
};

const FooterContainer = connector(Footer, { mapStateToProps, ownProps });
export default FooterContainer;
