import * as DISPLAY_MODE from '../constants/displayMode';

export default function getInitialState (apiConfiguration) {
  return {
    input: {},
    verifiedSteps: [],
    displayMode: DISPLAY_MODE.CARD,
    ...apiConfiguration
  };
}
