import domain from '../domain';
import * as ACTIONS from '../constants/actionTypes';
import stepVerified from './stepVerified';
import clearVerifiedSteps from './clearVerifiedSteps';
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

    dispatch(clearVerifiedSteps());
    const certificateDefinition = getCertificateDefinition(state);

    function stepVerifyCb (code, name, status, errorMessage) {
      const stepDefinition = { code, name, status, errorMessage };
      const step = domain.verification.createStep(stepDefinition);

      dispatch(stepVerified(step));
    }

    if (certificateDefinition) {
      await domain.certificates.verify(certificateDefinition, stepVerifyCb, stepVerifyCb);
    }
  };
}
