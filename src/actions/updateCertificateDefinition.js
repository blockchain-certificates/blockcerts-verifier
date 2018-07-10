import * as ACTIONS from '../constants/actionTypes';
import domain from '../domain';
import setErrorMessage from './setErrorMessage';
import verifyCertificate from './verifyCertificate';
import { getDisableAutoVerify } from '../selectors/api';

export default function updateCertificateDefinition (definition) {
  return async function (dispatch) {
    let metaInformation = null;
    const validation = domain.certificates.validate(definition);

    if (!validation.isValid) {
      definition = null;
    }

    dispatch(setErrorMessage(validation.errorMessage));

    if (validation.isValid) {
      metaInformation = domain.certificates.retrieveMetaInformation(definition);
    }

    dispatch({
      type: ACTIONS.UPDATE_CERTIFICATE_DEFINITION,
      payload: {
        definition,
        metaInformation
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
