import * as ACTIONS from '../constants/actionTypes';

export default function setErrorMessage (errorMessage) {
  return {
    type: ACTIONS.SET_ERROR_MESSAGE,
    payload: {
      errorMessage
    }
  };
}
