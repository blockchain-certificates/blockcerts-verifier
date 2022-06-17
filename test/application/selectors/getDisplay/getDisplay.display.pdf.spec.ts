import { getDisplayAsHTML } from '../../../../src/selectors/certificate';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import v3FixtureWithPdf from '../../../fixtures/v3/testnet-v3.0-beta-display-pdf.json';
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

  describe('given the certificate is a certificate with an image display property', function () {
    stubCertificateVerify(v3FixtureWithPdf);

    describe('and the type is image/png', function () {
      beforeEach(async function () {
        await store.dispatch(updateCertificateDefinition(v3FixtureWithPdf));
      });

      it('should return the display image as coded into the document', async function () {
        await store.dispatch(updateCertificateDefinition(v3FixtureWithPdf));
        const state = store.getState();
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        expect(getDisplayAsHTML(state)).toBe(`<embed width="100%" height="100%" type="application/pdf" src="data:application/pdf;base64,${v3FixtureWithPdf.display.content}"/>`);
      });
    });
  });
});
