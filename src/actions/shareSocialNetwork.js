import * as ACTIONS from '../constants/actionTypes';
import * as CERTIFICATE_EVENTS from '../constants/certificateEvents';
import domain from '../domain';
import { getCertificateDefinition } from '../selectors/certificate';

export default function (network) {
  return function (dispatch, getState) {
    const certificateDefinition = getCertificateDefinition(getState());
    domain.events.dispatch(CERTIFICATE_EVENTS.CERTIFICATE_SHARE, certificateDefinition);
    dispatch({
      type: ACTIONS.SHARE_SOCIAL_NETWORK
    });
  }
}
