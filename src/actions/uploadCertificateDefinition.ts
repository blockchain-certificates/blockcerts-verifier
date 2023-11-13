import * as ACTIONS from '../constants/actionTypes';
import domain from '../domain';
import updateCertificateDefinition from './updateCertificateDefinition';
import type { ThunkAction } from 'redux-thunk';
import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from './action';
import type { Dispatch } from 'redux';

export default function uploadCertificateDefinition (file: File): ThunkAction<Promise<void>, BlockcertsVerifierState, void, Action<void>> {
  return async function (dispatch: Dispatch): Promise<void> {
    dispatch({
      type: ACTIONS.UPLOAD_CERTIFICATE_DEFINITION
    });
    const definition = await domain.certificates.read(file);

    dispatch(updateCertificateDefinition(JSON.parse(definition)) as any);
  };
}
