import * as DISPLAY_MODE from '../constants/displayMode';
import * as THEME from '../constants/theme';
import VERIFICATION_STATUS from '../constants/verificationStatus';

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
    finalStep: {},
    verificationStatus: VERIFICATION_STATUS.DEFAULT,
    displayMode: DISPLAY_MODE.CARD,
    theme: THEME.BRIGHT,
    ...apiConfiguration
  };
}
