import * as ACTIONS from '../constants/actionTypes';
import setErrorMessage from './setErrorMessage';

export default function validateUrlInput (isValid) {
  return function (dispatch) {
    dispatch({
      type: ACTIONS.VALIDATE_URL_INPUT,
      payload: {
        isValid
      }
    });

    const errorMessage = isValid ? null : 'This does not seem to be a valid URL.';
    dispatch(setErrorMessage(errorMessage));
  };
}
