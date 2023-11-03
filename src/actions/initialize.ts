import type { ThunkAction } from 'redux-thunk';
import type { Action } from './action';
import * as ACTIONS from '../constants/actionTypes';
import updateCertificateUrl from './updateCertificateUrl';
import { getAPIOptions } from '../models/API';
import setLocale from '../i18n/setLocale';
import domain from '../domain';
import isJson from '../helpers/isJson';
import updateCertificateDefinition from './updateCertificateDefinition';
import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { IBlockcertsVerifierProps } from '../blockcerts-verifier/BlockcertsVerifier';

export interface InitializeActionPayload {
  options: IBlockcertsVerifierProps;
}

export default function initialize (options = {}): ThunkAction<void, BlockcertsVerifierState, void, Action<InitializeActionPayload>> {
  return function (dispatch) {
    const APIOptions = getAPIOptions(options);
    const { src, locale } = APIOptions as any;

    dispatch({
      type: ACTIONS.INITIALIZE,
      payload: {
        options: APIOptions
      }
    });

    if (domain.certificates.isPathToCertificateValidURI(src)) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(updateCertificateUrl(src));
    } else if (isJson(src)) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(updateCertificateDefinition(JSON.parse(src)));
    }

    setLocale(locale);
  };
}
