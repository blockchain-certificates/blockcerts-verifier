import * as ACTIONS from '../constants/actionTypes';
import domain from '../domain';
import setErrorMessage from './setErrorMessage';
import verifyCertificate from './verifyCertificate';
import { getDisableAutoVerify } from '../selectors/api';

export default function updateCertificateDefinition (definition) {
  return async function (dispatch) {
    const { certificateDefinition, errorMessage } = domain.certificates.validate(definition);

    dispatch(setErrorMessage(errorMessage));

    dispatch({
      type: ACTIONS.UPDATE_CERTIFICATE_DEFINITION,
      payload: {
        certificateDefinition
      }
    });

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
