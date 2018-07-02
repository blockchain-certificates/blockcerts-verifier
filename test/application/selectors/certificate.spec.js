import getInitialState from '../../../src/store/getInitialState';
import { getStartedVerificationSteps, getVerifiedSteps } from '../../../src/selectors/certificate';
import * as VERIFICATION_STATUS from '../../../src/constants/verificationStatus';

describe('certificate selectors test suite', function () {
  describe('getStartedVerificationSteps selector', function () {
    it('should return only the steps which have a started verification', function () {
      const state = getInitialState();
      const verifiedSteps = getVerifiedSteps(state);
      getVerifiedSteps(state)[0].status = VERIFICATION_STATUS.STARTED;

      expect(getStartedVerificationSteps(state)).toEqual([verifiedSteps[0]]);
    });
  });
});
