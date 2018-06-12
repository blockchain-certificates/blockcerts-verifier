import { configureStore } from '../../../src/store';
import updateCertificateUrl from '../../../src/actions/updateCertificateUrl';

describe('updateCertificateUrl action creator test suite', function () {
  describe('given it is dispatched with a url', function () {
    it('should update the state with the correct property', function () {
      const store = configureStore();
      const fixtureUrl = 'http://certificates.learningmachine.com/to/certificate';
      store.dispatch(updateCertificateUrl(fixtureUrl));
      const state = store.getState();

      expect(state.certificateUrl).toBe(fixtureUrl);
    });
  });
});
