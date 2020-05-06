import { ThunkAction } from 'redux-thunk';
import { Action } from './action';
import * as ACTIONS from '../constants/actionTypes';
import updateCertificateUrl from './updateCertificateUrl';
import { getAPIOptions } from '../models/API';
import setLocale from '../i18n/setLocale';

// TODO: define first any: State
// TODO: define second any: APIOptions
export default function initialize (options = {}): ThunkAction<void, any, void, Action<any>> {
  return function (dispatch) {
    const APIOptions = getAPIOptions(options);

    dispatch({
      type: ACTIONS.INITIALIZE,
      payload: {
        options: APIOptions
      }
    });

    if (APIOptions.src) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(updateCertificateUrl(APIOptions.src));
    }

    setLocale(APIOptions.locale);
  };
}
