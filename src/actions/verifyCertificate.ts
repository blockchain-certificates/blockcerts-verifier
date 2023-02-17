import domain from '../domain';
import * as ACTIONS from '../constants/actionTypes';
import * as CERTIFICATE_EVENTS from '../constants/certificateEvents';
import stepVerified from './stepVerified';
import clearVerifiedSteps from './clearVerifiedSteps';
import updateVerificationStatus from './updateVerificationStatus';
import { getCertificateDefinition } from '../selectors/certificate';
import { getDisableVerify } from '../selectors/api';
import updateFinalStep from './updateFinalStep';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';
import type { Dispatch } from 'redux';
import type { BlockcertsVerifierState } from '../store/getInitialState';

export default function verifyCertificate () {
  return async function (dispatch: Dispatch, getState: () => BlockcertsVerifierState): Promise<void> {
    const state = getState();

    if (getDisableVerify(state)) {
      console.warn('Verification is disabled');
      return;
    }

    dispatch({
      type: ACTIONS.VERIFY_CERTIFICATE
    });

    dispatch(updateVerificationStatus(VERIFICATION_STATUSES.STARTING));

    // @ts-expect-error TODO properly type actions in TS
    dispatch(clearVerifiedSteps());
    const certificateDefinition = getCertificateDefinition(state);

    if (certificateDefinition) {
      domain.events.dispatch(CERTIFICATE_EVENTS.CERTIFICATE_VERIFY, certificateDefinition);
      const finalStep = await certificateDefinition.verify(stepDefinition => {
        // @ts-expect-error TODO properly type actions in TS
        dispatch(stepVerified(stepDefinition));
      });

      dispatch(updateFinalStep(finalStep.message));
      dispatch(updateVerificationStatus(finalStep.status));
    }
  };
}
