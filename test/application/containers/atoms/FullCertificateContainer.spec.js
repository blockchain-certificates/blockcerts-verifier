import { mapStateToProps } from '../../../../src/components/molecules/FullCertificate/FullCertificateContainer';
import getInitialState from '../../../../src/store/getInitialState';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import { configureStore } from '../../../../src/store';
import XSSCertificateFixture from '../../../fixtures/xss-certificate-example';

describe('FullCertificateContainer test suite', function () {
  describe('mapStateToProps method', function () {
    it('should retrieve the sanitized displayHtml property', async function () {
      const initialState = getInitialState({ disableAutoVerify: true });
      const store = configureStore(initialState);

      await store.dispatch(updateCertificateDefinition(XSSCertificateFixture));

      const state = store.getState();

      expect(mapStateToProps(state).displayHTML).toBe('<section><div style="background-color:red;">YO!</div></section>');
    });
  });
});
