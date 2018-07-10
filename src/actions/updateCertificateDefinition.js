import * as ACTIONS from '../constants/actionTypes';
import domain from '../domain';
import setErrorMessage from './setErrorMessage';
import verifyCertificate from './verifyCertificate';
import { getDisableAllowVerify } from '../selectors/api';

export default function updateCertificateDefinition (definition) {
  return async function (dispatch) {
    const validation = domain.certificates.validate(definition);

    if (!validation.isValid) {
      definition = null;
    }

    dispatch(setErrorMessage(validation.errorMessage));

    dispatch({
      type: ACTIONS.UPDATE_CERTIFICATE_DEFINITION,
      payload: {
        definition
      }
    });

    await dispatch(autoVerify());
  };
}

function autoVerify () {
  return async function (dispatch, getState) {
    if (!getDisableAllowVerify(getState())) {
      dispatch({
        type: 'AUTO_VERIFY'
      });
      await dispatch(verifyCertificate());
    }
  };
}
