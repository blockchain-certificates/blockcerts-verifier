import * as ACTIONS from '../constants/actionTypes';
import * as CERTIFICATE_EVENTS from '../constants/certificateEvents';
import domain from '../domain';
import setErrorMessage from './setErrorMessage';
import verifyCertificate from './verifyCertificate';
import { getDisableAutoVerify } from '../selectors/api';

export default function updateCertificateDefinition (definition) {
  return async function (dispatch) {
    const { certificateDefinition, errorMessage } = domain.certificates.parse(definition);

    dispatch(setErrorMessage(errorMessage));

    dispatch({
      type: ACTIONS.UPDATE_CERTIFICATE_DEFINITION,
      payload: {
        certificateDefinition
      }
    });

    domain.events.dispatch(CERTIFICATE_EVENTS.CERTIFICATE_LOAD, certificateDefinition);

    await dispatch(autoVerify());
  };
}

function autoVerify () {
  return async function (dispatch, getState) {
    if (!getDisableAutoVerify(getState())) {
      dispatch({
        type: 'AUTO_VERIFY'
      });
      await dispatch(verifyCertificate());
    }
  };
}
