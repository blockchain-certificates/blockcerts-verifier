import { configureStore } from '../../../src/store';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import { getJSONCertificate } from '../../../src/selectors/certificate';
import { getErrorMessage } from '../../../src/selectors/error';
import certificateFixture from '../../fixtures/valid-certificate-example';
import notACertificateDefinition from '../../fixtures/not-a-certificate-definition';

describe('updateCertificateDefinition action creator test suite', function () {
  describe('given it is dispatched with a certification definition', function () {
    it('should set the certificate definition in the state', function () {
      const store = configureStore();
      store.dispatch(updateCertificateDefinition(certificateFixture));
      const state = store.getState();

      expect(getJSONCertificate(state)).toBe(certificateFixture);
    });
  });

  describe('given it is dispatched with a non-valid certification definition', function () {
    it('should not set the definition in the state', function () {
      const store = configureStore();
      store.dispatch(updateCertificateDefinition(notACertificateDefinition));
      const state = store.getState();

      expect(getJSONCertificate(state)).toBe(null);
    });

    it('should set the error in the state', function () {
      const store = configureStore();
      store.dispatch(updateCertificateDefinition(notACertificateDefinition));
      const state = store.getState();

      expect(getErrorMessage(state)).toBe('Not a valid Blockcerts definition.');
    });
  });
});
