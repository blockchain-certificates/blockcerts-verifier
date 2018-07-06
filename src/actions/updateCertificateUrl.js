import * as ACTIONS from '../constants/actionTypes';
import validateUrlInput from './validateUrlInput';
import domain from '../domain';
import updateCertificateDefinition from './updateCertificateDefinition';

import { isValidLocalPath, isValidUrl } from '../helpers/validations';
import setErrorMessage from './setErrorMessage';

export default function updateCertificateUrl (url) {
  return async function (dispatch) {
    const isUrlValid = isValidUrl(url) || isValidLocalPath(url);
    dispatch(validateUrlInput(isUrlValid));

    if (!isUrlValid) {
      return null;
    }

    const certificateDefinition = await domain.certificates.retrieve(url);

    if (certificateDefinition && typeof certificateDefinition !== 'string') {
      dispatch(updateCertificateDefinition(certificateDefinition));
    } else {
      dispatch(setErrorMessage(certificateDefinition));
    }

    dispatch({
      type: ACTIONS.UPDATE_CERTIFICATE_URL,
      payload: {
        url
      }
    });
  };
}
