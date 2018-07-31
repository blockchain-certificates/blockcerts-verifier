import * as ACTIONS from '../constants/actionTypes';
import stepVerified from './stepVerified';
import clearVerifiedSteps from './clearVerifiedSteps';
import { getCertificateDefinition } from '../selectors/certificate';
import { getDisableVerify } from '../selectors/api';
import * as VERIFICATION_STATUS from '../constants/verificationStatus';

export default function verifyCertificate () {
  return async function (dispatch, getState) {
    const state = getState();

    if (getDisableVerify(state)) {
      console.warn('Verification is disabled');
      return;
    }

    dispatch({
      type: ACTIONS.VERIFY_CERTIFICATE,
      payload: {
        status: VERIFICATION_STATUS.STARTED
      }
    });

    dispatch(clearVerifiedSteps());
    const certificateDefinition = getCertificateDefinition(state);

    if (certificateDefinition) {
      const finalStatus = await certificateDefinition.verify(stepDefinition => {
        dispatch(stepVerified(stepDefinition));
      });

      dispatch({
        type: ACTIONS.END_VERIFICATION_PROCESS,
        payload: {
          status: finalStatus.status
        }
      })
    }
  };
}
