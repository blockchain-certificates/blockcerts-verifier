import { mapStateToProps } from '../../../../src/components/atoms/DownloadPDFLink/DownloadPDFLinkContainer';
import getInitialState from '../../../../src/store/getInitialState';
import { configureStore } from '../../../../src/store/index';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import validCertificateDefinition from '../../../fixtures/v2/valid-certificate-example.json';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';

describe('DownloadPDFContainer test suite', function () {
  stubCertificateVerify(validCertificateDefinition);
  let store;

  beforeEach(function () {
    store = configureStore();
  });

  afterEach(function () {
    store = null;
  });

  describe('mapStateToProps method', function () {
    describe('isVisible property', function () {
      describe('when there is no certificateDefinition', function () {
        it('should be false', function () {
          const state = getInitialState();
          expect(mapStateToProps(state).isVisible).toBe(false);
        });
      });

      describe('when there is a certificateDefinition', function () {
        it('should be true', async function () {
          await store.dispatch(updateCertificateDefinition(validCertificateDefinition));
          const state = store.getState();

          expect(mapStateToProps(state).isVisible).toBe(true);
        });
      });
    });
  });
});
