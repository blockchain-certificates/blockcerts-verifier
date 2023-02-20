import * as ACTIONS from '../constants/actionTypes';
import * as CERTIFICATE_EVENTS from '../constants/certificateEvents';
import domain from '../domain';
import setErrorMessage from './setErrorMessage';
import verifyCertificate from './verifyCertificate';
import { getDidResolverUrl, getDisableAutoVerify, getExplorerAPIs, getLocale } from '../selectors/api';
import showVerificationModal from './showVerificationModal';
import type { CertificateOptions } from '@blockcerts/cert-verifier-js';
import type { Dispatch } from 'redux';
import type { BlockcertsVerifierState } from '../store/getInitialState';

// TODO: define input type to be a valid blockcerts document definition
export default function updateCertificateDefinition (definition: any) {
  return async function (dispatch: Dispatch, getState: () => BlockcertsVerifierState): Promise<void> {
    const state = getState();
    const options: CertificateOptions = {
      locale: getLocale(state),
      explorerAPIs: getExplorerAPIs(state),
      didResolverUrl: getDidResolverUrl(state)
    };
    const { certificateDefinition, errorMessage } = await domain.certificates.parse(definition, options);

    dispatch(setErrorMessage(errorMessage));

    dispatch({
      type: ACTIONS.UPDATE_CERTIFICATE_DEFINITION,
      payload: {
        certificateDefinition
      }
    });

    domain.events.dispatch(CERTIFICATE_EVENTS.CERTIFICATE_LOAD, certificateDefinition);

    if (certificateDefinition != null) {
      // @ts-expect-error TODO properly type actions in TS
      await dispatch(autoVerify());
    }
  };
}

function autoVerify () {
  return async function (dispatch: Dispatch, getState: () => BlockcertsVerifierState): Promise<void> {
    if (!getDisableAutoVerify(getState())) {
      dispatch({
        type: ACTIONS.AUTO_VERIFY
      });
      dispatch(showVerificationModal(true));
    }
    // @ts-expect-error TODO properly type actions in TS
    await dispatch(verifyCertificate());
  };
}
