import { configureStore } from '../../../src/store';
import { getShowVerificationModal, getVerificationStatus } from '../../../src/selectors/verification';
import startVerificationProcess from '../../../src/actions/startVerificationProcess';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';

describe('startVerificationProcess test suite', function () {
  let store;

  beforeEach(async function () {
    store = configureStore();
    store.dispatch(startVerificationProcess());
  });

  afterEach(function () {
    store = null;
  });

  describe('given it is called', function () {
    it('should show the modal', function () {
      const state = store.getState();
      expect(getShowVerificationModal(state)).toBe(true);
    });

    it('should verify the certificate', function () {
      const state = store.getState();
      expect(getVerificationStatus(state)).toBe(VERIFICATION_STATUSES.STARTING);
    });
  });
});
