import * as ACTIONS from '../constants/actionTypes';
import { Action } from './action';

export interface SetErrorMessageActionPayload {
  errorMessage: string;
}

export default function setErrorMessage (errorMessage: string): Action<SetErrorMessageActionPayload> {
  return {
    type: ACTIONS.SET_ERROR_MESSAGE,
    payload: {
      errorMessage
    }
  };
}
