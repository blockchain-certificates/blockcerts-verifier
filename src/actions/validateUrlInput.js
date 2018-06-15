import * as ACTIONS from '../constants/actionTypes';

import { isValidUrl } from '../helpers/validations';

export default function validateUrlInput (url) {
  const isValid = isValidUrl(url);
  return {
    type: ACTIONS.VALIDATE_URL_INPUT,
    payload: {
      isValid
    }
  };
}
