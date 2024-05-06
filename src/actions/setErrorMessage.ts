import * as ACTIONS from '../constants/actionTypes';
import type { Action } from './action';

export interface SetErrorMessageActionPayload {
  errorMessage: string;
  additionalErrorInfo?: string;
}

export default function setErrorMessage (errorMessage: string, additionalErrorInfo?: string): Action<SetErrorMessageActionPayload> {
  return {
    type: ACTIONS.SET_ERROR_MESSAGE,
    payload: {
      errorMessage,
      additionalErrorInfo
    }
  };
}
