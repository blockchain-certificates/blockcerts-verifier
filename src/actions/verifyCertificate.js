import domain from '../domain';
import * as ACTIONS from '../constants/actionTypes';
import * as CERTIFICATE_EVENTS from '../constants/certificateEvents';
import VERIFICATION_STATUS from '../constants/verificationStatus';
import stepVerified from './stepVerified';
import clearVerifiedSteps from './clearVerifiedSteps';
import updateVerificationStatus from './updateVerificationStatus';
import { getCertificateDefinition } from '../selectors/certificate';
import { getDisableVerify } from '../selectors/api';

export default function verifyCertificate () {
  return async function (dispatch, getState) {
    const state = getState();

    if (getDisableVerify(state)) {
      console.warn('Verification is disabled');
      return;
    }

    dispatch({
      type: ACTIONS.VERIFY_CERTIFICATE
    });

    dispatch(updateVerificationStatus(VERIFICATION_STATUS.STARTED));

    dispatch(clearVerifiedSteps());
    const certificateDefinition = getCertificateDefinition(state);

    if (certificateDefinition) {
      domain.events.dispatch(CERTIFICATE_EVENTS.CERTIFICATE_VERIFY, certificateDefinition);
      const finalStatus = await certificateDefinition.verify(stepDefinition => {
        dispatch(stepVerified(stepDefinition));
      });

      console.log(finalStatus);

      dispatch(updateVerificationStatus(finalStatus.status));
    }
  };
}
