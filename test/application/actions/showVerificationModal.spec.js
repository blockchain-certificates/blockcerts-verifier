import { configureStore } from '../../../src/store';
import getInitialState from '../../../src/store/getInitialState';
import showVerificationModal from '../../../src/actions/showVerificationModal';
import { getShowVerificationModal } from '../../../src/selectors/verification';

describe('showVerificationModal action creator test suite', function () {
  let store;

  beforeEach(function () {
    const initialState = getInitialState({ disableAutoVerify: true });
    store = configureStore(initialState);
  });

  afterEach(function () {
    store = null;
  });

  describe('given it is called with true', function () {
    it('should set the showVerificationModal to true in the state', function () {
      store.dispatch(showVerificationModal(true));
      const state = store.getState();
      expect(getShowVerificationModal(state)).toBe(true);
    });
  });

  describe('given it is called with false', function () {
    it('should set the showVerificationModal to false in the state', function () {
      store.dispatch(showVerificationModal(false));
      const state = store.getState();
      expect(getShowVerificationModal(state)).toBe(false);
    });
  });
});
