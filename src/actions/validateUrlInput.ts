import * as ACTIONS from '../constants/actionTypes';
import setErrorMessage from './setErrorMessage';
import type { ThunkAction } from 'redux-thunk';
import type { Action } from './action';

export interface ValidateUrlInputActionPayload {
  isValid: boolean;
}

export default function validateUrlInput (isValid: boolean): ThunkAction<void, any, void, Action<ValidateUrlInputActionPayload>> {
  return function (dispatch) {
    dispatch({
      type: ACTIONS.VALIDATE_URL_INPUT,
      payload: {
        isValid
      }
    });

    const errorMessage = isValid ? null : 'errors.invalidUrl';
    dispatch(setErrorMessage(errorMessage) as any); // TODO: properly handle overload
  };
}
