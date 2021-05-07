import { bindActionCreators } from 'redux';
import { configureStore } from '../../../src/store';
import getInitialState from '../../../src/store/getInitialState';
import { mapDispatchToProps, mapStateToProps } from '../../../src/blockcerts-verifier/BlockcertsVerifierContainer';
import { getDisplayMode } from '../../../src/selectors/api';
import setErrorMessage from '../../../src/actions/setErrorMessage';
import fixtureCertificate from '../../fixtures/v2/mainnet-valid-2.0.json';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';

describe('BlockcertsVerifierContainer test suite', function () {
  let store;

  beforeEach(function () {
    const initialState = getInitialState({ disableVerification: true });
    store = configureStore(initialState);
  });

  afterEach(function () {
    store = null;
  });

  describe('mapDispatchToProps', function () {
    it('should bind the onLoad method to the initialize action creator', function () {
      const fixtureOptions = {
        displayMode: 'test'
      };
      const boundMapDispatchToProps = bindActionCreators(mapDispatchToProps, store.dispatch); // handled by connector in real life
      boundMapDispatchToProps.onLoad(fixtureOptions);
      const state = store.getState();
      expect(getDisplayMode(state)).toBe('test');
    });
  });

  describe('mapStateToProps', function () {
    describe('given there is an errorMessage in the state', function () {
      it('should return set the errorMessage in the props', function () {
        const fixtureErrorMessage = 'this is test error';
        store.dispatch(setErrorMessage(fixtureErrorMessage));
        const state = store.getState();
        const props = mapStateToProps(state);
        expect(props.errorMessage).toBe(fixtureErrorMessage);
      });
    });

    describe('given there is a certificate definition in the state', function () {
      it('should return set the hasCertificate prop to true', async function () {
        await store.dispatch(updateCertificateDefinition(fixtureCertificate));
        const state = store.getState();
        const props = mapStateToProps(state);
        expect(props.hasCertificate).toBe(true);
      });
    });
  });
});
