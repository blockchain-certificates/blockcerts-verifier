import VERIFICATION_STATUS from '../constants/verificationStatus';

export function getVerificationStatus (state) {
  return state.verificationStatus;
}

export function getVerificationIsFinished (state) {
  const status = getVerificationStatus(state);

  return status === VERIFICATION_STATUS.SUCCESS
    || status === VERIFICATION_STATUS.FAILURE
    || status === VERIFICATION_STATUS.MOCK_SUCCESS;
}
