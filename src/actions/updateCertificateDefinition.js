import * as ACTIONS from '../constants/actionTypes';

export default function updateCertificateDefinition (definition) {
  return {
    type: ACTIONS.UPDATE_CERTIFICATE_DEFINITION,
    payload: {
      definition
    }
  };
}
