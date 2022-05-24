import { configureStore } from '../../../src/store';
import resetVerificationStatus from '../../../src/actions/resetVerificationStatus';
import { getVerificationStatus } from '../../../src/selectors/verification';
import { getFinalStep } from '../../../src/selectors/certificate';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';

describe('resetVerificationStatus action creator test suite', function () {
  let store;

  beforeEach(function () {
    store = configureStore();
  });

  afterEach(function () {
    store = null;
  });

  it('should reset the verificationStatus to the default status', function () {
    let state = store.getState();

    state.verificationStatus = VERIFICATION_STATUSES.SUCCESS;

    store.dispatch(resetVerificationStatus());

    state = store.getState();

    expect(getVerificationStatus(state)).toBe(VERIFICATION_STATUSES.DEFAULT);
  });

  it('should reset the verificationStatus to the default status', function () {
    let state = store.getState();

    state.finalStep = {
      label: 'Success',
      description: 'This was a complete success',
      linkText: 'View more about the success'
    };

    store.dispatch(resetVerificationStatus());

    state = store.getState();

    expect(getFinalStep(state)).toBe(null);
  });
});
