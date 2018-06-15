import * as ACTIONS from '../constants/actionTypes';
import validateUrlInput from './validateUrlInput';

export default function verifyCertificate () {
  return function (dispatch, getState) {
    // validate input url
    const url = getState().input.certificateUrl; // TODO: should be a selector
    let validInput = true;
    if (url) {
      validInput = dispatch(validateUrlInput(url)).payload.isValid;
    }

    if (!validInput) {
      return null;
    }
    // retrieve certificate
    // store certificate
    // call verifier

    dispatch({
      type: ACTIONS.VERIFY_CERTIFICATE
    });
  }
}
