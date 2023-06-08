import * as ACTIONS from '../constants/actionTypes';
import * as CERTIFICATE_EVENTS from '../constants/certificateEvents';
import domain from '../domain';
import { getCertificateDefinition } from '../selectors/certificate';

export default function (socialNetwork) {
  return function (dispatch, getState) {
    const certificateDefinition = getCertificateDefinition(getState());

    domain.events.dispatch(CERTIFICATE_EVENTS.CERTIFICATE_SHARE, certificateDefinition, { socialNetwork });

    dispatch({
      type: ACTIONS.SHARE_SOCIAL_NETWORK
    });
  };
}
