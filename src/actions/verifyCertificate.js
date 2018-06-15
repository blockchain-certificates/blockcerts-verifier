import domain from '../domain';
import * as ACTIONS from '../constants/actionTypes';
import validateUrlInput from './validateUrlInput';
import { getCertificateUrl } from '../selectors/input';
import updateCertificateDefinition from './updateCertificateDefinition';

export default function verifyCertificate () {
  return async function (dispatch, getState) {
    const url = getCertificateUrl(getState());

    const validInput = dispatch(validateUrlInput(url)).payload.isValid;
    if (!validInput) {
      return null;
    }

    const certificateDefinition = await domain.certificates.retrieve(url);

    if (certificateDefinition && typeof certificateDefinition !== 'string') {
      dispatch(updateCertificateDefinition(certificateDefinition));
    }

    // TODO: call verifier once implement

    dispatch({
      type: ACTIONS.VERIFY_CERTIFICATE
    });
  }
}
