import * as ACTIONS from '../constants/actionTypes';
import clearVerifiedSteps from '../actions/clearVerifiedSteps';

export default function resetCertificateDefinition () {
  return function (dispatch) {
    dispatch(clearVerifiedSteps());

    dispatch({
      type: ACTIONS.RESET_CERTIFICATE_DEFINITION,
      payload: {
        definition: null
      }
    })
  }
}
