import { configureStore } from '../../../src/store';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import { getJSONCertificate } from '../../../src/selectors/certificate';
import certificateFixture from '../../fixtures/valid-certificate-example';

describe('updateCertificateDefinition action creator test suite', function () {
  describe('given it is dispatched with a certification definition', function () {
    it('should update the state with the correct property', function () {
      const store = configureStore();
      store.dispatch(updateCertificateDefinition(certificateFixture));
      const state = store.getState();

      expect(getJSONCertificate(state)).toBe(certificateFixture);
    });
  });
});
