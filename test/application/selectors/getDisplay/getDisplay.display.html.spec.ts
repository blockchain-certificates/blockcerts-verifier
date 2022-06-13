import { getDisplayAsHTML } from '../../../../src/selectors/certificate';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import v3Fixture from '../../../fixtures/v3/testnet-v3.0-beta.json';
import { configureStore } from '../../../../src/store';
import getInitialState from '../../../../src/store/getInitialState';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';

describe('getDisplayAsHTML selector', function () {
  let store;

  beforeEach(function () {
    const initialState = getInitialState({ disableVerify: true });
    store = configureStore(initialState);
  });

  afterEach(function () {
    store = null;
  });

  describe('given the certificate is a certificate with a display property', function () {
    stubCertificateVerify(v3Fixture);

    describe('and the type is text/html', function () {
      beforeEach(async function () {
        await store.dispatch(updateCertificateDefinition(v3Fixture));
      });

      it('should return the display HTML as coded into the document', function () {
        const state = store.getState();
        expect(getDisplayAsHTML(state)).toBe('<b>hello world</b>');
      });
    });
  });
});
