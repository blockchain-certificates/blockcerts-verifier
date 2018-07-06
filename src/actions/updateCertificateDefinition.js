import * as ACTIONS from '../constants/actionTypes';
import domain from '../domain';
import setErrorMessage from './setErrorMessage';

export default function updateCertificateDefinition (definition) {
  return function (dispatch) {
    const validation = domain.certificates.validate(definition);

    if (!validation.isValid) {
      definition = null;
    }

    dispatch(setErrorMessage(validation.errorMessage));

    return dispatch({
      type: ACTIONS.UPDATE_CERTIFICATE_DEFINITION,
      payload: {
        definition
      }
    });
  };
}
