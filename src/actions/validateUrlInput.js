import * as ACTIONS from '../constants/actionTypes';

export default function validateUrlInput (isValid) {
  return {
    type: ACTIONS.VALIDATE_URL_INPUT,
    payload: {
      isValid
    }
  };
}
