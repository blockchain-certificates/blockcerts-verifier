import { configureStore } from '../../../../src/store';
import { mapStateToProps } from '../../../../src/components/organisms/FullCertificate/FullCertificateContainer';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import XSSCertificateFixture from '../../../fixtures/xss-certificate-example.json';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';

describe('FullCertificateContainer test suite', function () {
  let store;

  beforeEach(function () {
    store = configureStore();
  });

  afterEach(function () {
    store = null;
  });

  describe('mapStateToProps property', function () {
    stubCertificateVerify(XSSCertificateFixture);
    describe('given there is a certificate definition in the state', function () {
      let state;

      beforeEach(async function () {
        await store.dispatch(updateCertificateDefinition(XSSCertificateFixture));
        state = store.getState();
      });

      afterEach(function () {
        state = null;
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
        const state = store.getState();
        expect(mapStateToProps(state).hasCertificateDefinition).toBe(false);
      });
    });
  });
});
