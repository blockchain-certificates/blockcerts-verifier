import * as ACTIONS from '../constants/actionTypes';
import domain from '../domain';
import updateCertificateDefinition from './updateCertificateDefinition';

export default function uploadCertificateDefinition (file) {
  return async function (dispatch) {
    dispatch({
      type: ACTIONS.UPLOAD_CERTIFICATE_DEFINITION
    });
    const definition = await domain.certificates.read(file);

    dispatch(updateCertificateDefinition(JSON.parse(definition)));
  };
}
