import * as ACTIONS from '../constants/actionTypes';
import validateUrlInput from './validateUrlInput';
import domain from '../domain';
import updateCertificateDefinition from './updateCertificateDefinition';
import setErrorMessage from './setErrorMessage';

export default function updateCertificateUrl (url) {
  return async function (dispatch) {
    const isUrlValid = domain.certificates.isPathToCertificateValidURI(url);
    dispatch(validateUrlInput(isUrlValid));

    if (!isUrlValid) {
      return null;
    }

    dispatch({
      type: ACTIONS.UPDATE_CERTIFICATE_URL,
      payload: {
        url
      }
    });

    const retrievedData = await domain.certificates.retrieve(url);

    if (retrievedData.certificateDefinition) {
      await dispatch(updateCertificateDefinition(retrievedData.certificateDefinition));
    } else {
      dispatch(setErrorMessage(retrievedData.errorMessage));
    }
  };
}
