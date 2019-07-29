import { configureStore } from '../../../../src/store';
import { mapStateToProps } from '../../../../src/components/organisms/FullScreenCertificate/FullScreenCertificateContainer';
import getInitialState from '../../../../src/store/getInitialState';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import XSSCertificateFixture from '../../../fixtures/xss-certificate-example';

describe('FullScreenCertificateContainer test suite', function () {
  describe('mapStateToProps property', function () {
    describe('given there is a certificate definition in the state', function () {
      let store;
      let state;

      beforeEach(async function () {
        const initialState = getInitialState({ disableAutoVerify: true });
        store = configureStore(initialState);
        await store.dispatch(updateCertificateDefinition(XSSCertificateFixture));
        state = store.getState();
      });

      afterEach(function () {
        store = null;
      });

      it('should retrieve the recipient name', function () {
        expect(mapStateToProps(state).recipientName).toBe('Jérôme Collé');
      });

      it('should set the hasCertificateDefinition property to true', function () {
        expect(mapStateToProps(state).hasCertificateDefinition).toBe(true);
      });

      it('should retrieve the sanitized displayHtml property', function () {
        expect(mapStateToProps(state).displayHTML).toBe('<section><div style="background-color:red;">YO!</div></section>');
      });
    });

    describe('given there is no certificate definition in the state', function () {
      it('should set the hasCertificateDefinition property to false', function () {
        const initialState = getInitialState({ disableAutoVerify: true });
        const store = configureStore(initialState);
        const state = store.getState();
        expect(mapStateToProps(state).hasCertificateDefinition).toBe(false);
      });
    });
  });
});
