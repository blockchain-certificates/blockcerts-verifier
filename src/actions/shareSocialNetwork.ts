import * as ACTIONS from '../constants/actionTypes';
import * as CERTIFICATE_EVENTS from '../constants/certificateEvents';
import domain from '../domain';
import { getCertificateDefinition } from '../selectors/certificate';
import type { ThunkAction } from 'redux-thunk';
import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { Action } from './action';
import type { Dispatch } from 'redux';

export default function (socialNetwork: string): ThunkAction<void, BlockcertsVerifierState, void, Action<void>> {
  return function (dispatch: Dispatch, getState: () => BlockcertsVerifierState): void {
    const certificateDefinition = getCertificateDefinition(getState());

    domain.events.dispatch(CERTIFICATE_EVENTS.CERTIFICATE_SHARE, certificateDefinition, { socialNetwork });

    dispatch({
      type: ACTIONS.SHARE_SOCIAL_NETWORK
    });
  };
}
