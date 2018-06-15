import { configureStore } from '../../../src/store';
import verifyCertificate from '../../../src/actions/verifyCertificate';
import updateCertificateUrl from '../../../src/actions/updateCertificateUrl';
import { getUrlIsValid } from '../../../src/selectors/input';

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

      const state = store.getState();

      expect(getUrlIsValid(state)).toBe(false);
    });

    it('should do nothing', function () {
      expect(store.dispatch(verifyCertificate())).toBe(null);
    });
  });
});
