import * as DISPLAY_MODE from '../constants/displayMode';
import * as THEME from '../constants/theme';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';

// TODO: implement typescript
// TODO: export this typing from cert-verifier-js
// export interface IFinalStep = {
//   description: string;
//   label: string;
//   linkText?: string;
// }

export default function getInitialState (apiConfiguration = {}) {
  return {
    input: {},
    verifiedSteps: [],
    finalStep: null,
    verificationStatus: VERIFICATION_STATUSES.DEFAULT,
    showVerificationModal: false,
    displayMode: DISPLAY_MODE.CARD,
    disableDownloadPdf: false,
    theme: THEME.BRIGHT,
    ...apiConfiguration
  };
}
