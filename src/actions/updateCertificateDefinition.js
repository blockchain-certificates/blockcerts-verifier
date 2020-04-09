import * as ACTIONS from '../constants/actionTypes';
import * as CERTIFICATE_EVENTS from '../constants/certificateEvents';
import domain from '../domain';
import setErrorMessage from './setErrorMessage';
import verifyCertificate from './verifyCertificate';
import { getDisableAutoVerify, getLocale } from '../selectors/api';
import showVerificationModal from './showVerificationModal';

export default function updateCertificateDefinition (definition) {
  return async function (dispatch, getState) {
    const locale = getLocale(getState());
    const { certificateDefinition, errorMessage } = await domain.certificates.parse(definition, { locale });

    dispatch(setErrorMessage(errorMessage));

    dispatch({
      type: ACTIONS.UPDATE_CERTIFICATE_DEFINITION,
      payload: {
        certificateDefinition
      }
    });

    domain.events.dispatch(CERTIFICATE_EVENTS.CERTIFICATE_LOAD, certificateDefinition);

    if (certificateDefinition != null) {
      await dispatch(autoVerify());
    }
  };
}

function autoVerify () {
  return async function (dispatch, getState) {
    if (!getDisableAutoVerify(getState())) {
      dispatch({
        type: ACTIONS.AUTO_VERIFY
      });
      dispatch(showVerificationModal(true));
    }
    await dispatch(verifyCertificate());
  };
}
