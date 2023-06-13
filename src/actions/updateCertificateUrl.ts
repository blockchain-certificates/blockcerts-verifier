import * as ACTIONS from '../constants/actionTypes';
import validateUrlInput from './validateUrlInput';
import domain from '../domain';
import updateCertificateDefinition from './updateCertificateDefinition';
import setErrorMessage from './setErrorMessage';
import type { ThunkAction } from 'redux-thunk';
import type { Action } from './action';

export interface UpdateCertificateUrlActionPayload {
  url: string;
}

export default function updateCertificateUrl (url: string): ThunkAction<void, any, void, Action<UpdateCertificateUrlActionPayload>> {
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
      dispatch(setErrorMessage(retrievedData.errorMessage) as any); // TODO: fix type overload
    }
  };
}
