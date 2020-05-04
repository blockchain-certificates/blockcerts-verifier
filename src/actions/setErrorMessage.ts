import * as ACTIONS from '../constants/actionTypes';
import { Action } from './action';

type TSetErrorMessagePayload = {
  errorMessage: string;
};

export default function setErrorMessage (errorMessage: string): Action<TSetErrorMessagePayload> {
  return {
    type: ACTIONS.SET_ERROR_MESSAGE,
    payload: {
      errorMessage
    }
  };
}
