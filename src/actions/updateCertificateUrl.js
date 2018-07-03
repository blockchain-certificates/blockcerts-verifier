import * as ACTIONS from '../constants/actionTypes';
import validateUrlInput from './validateUrlInput';
import domain from '../domain';
import updateCertificateDefinition from './updateCertificateDefinition';

import { isValidUrl } from '../helpers/validations';

export default function updateCertificateUrl (url) {
  return async function (dispatch) {
    const isUrlValid = isValidUrl(url);

    if (!isUrlValid) {
      dispatch(validateUrlInput(isUrlValid));
      return null;
    }

    const certificateDefinition = await domain.certificates.retrieve(url);

    if (certificateDefinition && typeof certificateDefinition !== 'string') {
      dispatch(updateCertificateDefinition(certificateDefinition));
    }

    dispatch({
      type: ACTIONS.UPDATE_CERTIFICATE_URL,
      payload: {
        url
      }
    });
  }
}
