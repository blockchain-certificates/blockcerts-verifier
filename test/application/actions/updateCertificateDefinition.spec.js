import { configureStore } from '../../../src/store';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import { getCertificateDefinition } from '../../../src/selectors/certificate';
import { getErrorMessage } from '../../../src/selectors/error';
import certificateFixture from '../../fixtures/valid-certificate-example';
import notACertificateDefinition from '../../fixtures/not-a-certificate-definition';

describe('updateCertificateDefinition action creator test suite', function () {
  let store;

  beforeEach(function () {
    store = configureStore();
  });

  afterEach(function () {
    store = null;
  });

  describe('given it is dispatched with a certification definition', function () {
    it('should set the certificate definition in the state', function () {
      store.dispatch(updateCertificateDefinition(certificateFixture));
      const state = store.getState();

      expect(getCertificateDefinition(state)).toBe(certificateFixture);
    });

    it('should set the error in the state to undefined', function () {
      // initially trigger an error in the state
      store.dispatch(updateCertificateDefinition(notACertificateDefinition));
      store.dispatch(updateCertificateDefinition(certificateFixture));
      const state = store.getState();

      expect(getErrorMessage(state)).toBe(undefined);
    });
  });

  describe('given it is dispatched with a non-valid certification definition', function () {
    it('should not set the definition in the state', function () {
      store.dispatch(updateCertificateDefinition(notACertificateDefinition));
      const state = store.getState();

      expect(getCertificateDefinition(state)).toBe(null);
    });

    it('should set the error in the state', function () {
      store.dispatch(updateCertificateDefinition(notACertificateDefinition));
      const state = store.getState();

      expect(getErrorMessage(state)).toBe('Not a valid Blockcerts definition.');
    });
  });
});
