import { configureStore } from '../../../src/store';
import VERIFICATION_STATUS from '../../../src/constants/verificationStatus';
import resetVerificationStatus from '../../../src/actions/resetVerificationStatus';

describe('resetVerificationStatus action creator test suite', function () {
  it('should reset the verificationStatus to the default status', function () {
    const store = configureStore();
    const state = store.getState();

    state.verificationStatus = VERIFICATION_STATUS.SUCCESS;

    store.dispatch(resetVerificationStatus());

    expect(store.getState().verificationStatus).toBe(VERIFICATION_STATUS.DEFAULT);
  });
});
