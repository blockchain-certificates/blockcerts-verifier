import domain from '../domain';
import * as ACTIONS from '../constants/actionTypes';
import stepVerified from './stepVerified';
import clearVerifiedSteps from './clearVerifiedSteps';
import { getCertificateDefinition } from '../selectors/certificate';

export default function verifyCertificate () {
  return async function (dispatch, getState) {
    dispatch({
      type: ACTIONS.VERIFY_CERTIFICATE
    });

    dispatch(clearVerifiedSteps());
    const certificateDefinition = getCertificateDefinition(getState());

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
