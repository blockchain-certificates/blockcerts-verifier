import * as ACTIONS from '../constants/actionTypes';
import clearVerifiedSteps from '../actions/clearVerifiedSteps';
import resetVerificationStatus from './resetVerificationStatus';

export default function resetCertificateDefinition () {
  return function (dispatch) {
    dispatch(clearVerifiedSteps());
    dispatch(resetVerificationStatus());

    dispatch({
      type: ACTIONS.RESET_CERTIFICATE_DEFINITION,
      payload: {
        definition: null
      }
    });
  };
}
