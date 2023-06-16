import { mapStateToProps } from '../../../../src/components/organisms/FullCertificate/FullCertificateContainer';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import { configureStore } from '../../../../src/store';
import XSSCertificateFixture from '../../../fixtures/xss-certificate-example';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';

describe('FullCertificateContainer test suite', function () {
  describe('mapStateToProps method', function () {
    stubCertificateVerify(XSSCertificateFixture);

    it('should retrieve the sanitized displayHtml property', async function () {
      const store = configureStore();
      await store.dispatch(updateCertificateDefinition(XSSCertificateFixture));

      const state = store.getState();

      expect(mapStateToProps(state).displayHTML).toBe('<section><div style="background-color:red;">YO!</div></section>');
    });
  });
});
