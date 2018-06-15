import { configureStore } from '../../../src/store';
import verifyCertificate from '../../../src/actions/verifyCertificate';
import updateCertificateUrl from '../../../src/actions/updateCertificateUrl';

describe('verifyCertificate action creator test suite', function () {
  describe('given the url inputted is invalid', function () {
    let store;

    beforeEach(function () {
      store = configureStore();
      // prepare state the correct way
      store.dispatch(updateCertificateUrl('invalid url'));
    });

    afterEach(function () {
      store = null;
    });

    it('should update the state input isValid property to false', function () {
      store.dispatch(verifyCertificate());

      expect(store.getState().input.isValid).toBe(false);
    });

    it('should do nothing', function () {
      expect(store.dispatch(verifyCertificate())).toBe(null);
    });
  });
});
