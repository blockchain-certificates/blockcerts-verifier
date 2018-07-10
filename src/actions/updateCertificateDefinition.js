import * as ACTIONS from '../constants/actionTypes';
import domain from '../domain';
import setErrorMessage from './setErrorMessage';

export default function updateCertificateDefinition (definition) {
  return function (dispatch) {
    let metaInformation = null;
    const validation = domain.certificates.validate(definition);

    if (!validation.isValid) {
      definition = null;
    }

    dispatch(setErrorMessage(validation.errorMessage));

    if (validation.isValid) {
      metaInformation = domain.certificates.retrieveMetaInformation(definition);
    }

    return dispatch({
      type: ACTIONS.UPDATE_CERTIFICATE_DEFINITION,
      payload: {
        definition,
        metaInformation
      }
    });
  };
}
