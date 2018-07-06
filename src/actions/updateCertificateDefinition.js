import * as ACTIONS from '../constants/actionTypes';
import domain from '../domain';

export default function updateCertificateDefinition (definition) {
  const validation = domain.certificates.validate(definition);

  if (!validation.isValid) {
    definition = {};
  }

  return {
    type: ACTIONS.UPDATE_CERTIFICATE_DEFINITION,
    payload: {
      definition
    }
  };
}
