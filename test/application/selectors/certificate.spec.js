import getInitialState from '../../../src/store/getInitialState';
import {
  getIssueDate,
  getIssuedOn,
  getStartedVerificationSteps,
  getVerifiedSteps
} from '../../../src/selectors/certificate';
import * as VERIFICATION_STATUS from '../../../src/constants/verificationStatus';
import v1Fixture from '../../fixtures/valid-v1-certificate';
import v2Fixture from '../../fixtures/valid-certificate-example';
import { configureStore } from '../../../src/store';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';

describe('certificate selectors test suite', function () {
  let initialState;
  let store;

  beforeEach(function () {
    initialState = getInitialState({ disableAutoVerify: true });
    store = configureStore(initialState);
  });

  afterEach(function () {
    initialState = null;
    store = null;
  });

  describe('getStartedVerificationSteps selector', function () {
    it('should return only the steps which have a started verification', function () {
      const state = getInitialState();
      const verifiedSteps = getVerifiedSteps(state);
      getVerifiedSteps(state)[0].status = VERIFICATION_STATUS.STARTED;

      expect(getStartedVerificationSteps(state)).toEqual([verifiedSteps[0]]);
    });
  });

  describe('getIssuedOn selector', function () {
    it('should return the date of issuance for a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getIssuedOn(state)).toBe('2017-05-05T16:45:26.925+00:00');
    });

    it('should return the date of issuance for a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getIssuedOn(state)).toBe('2018-01-23T00:43:15.978+00:00');
    });
  });

  describe('getIssueDate selector', function () {
    it('should return a readable date for a v1 certificate', function () {
      store.dispatch(updateCertificateDefinition(v1Fixture));
      const state = store.getState();

      expect(getIssueDate(state)).toBe('May 5, 2017');
    });

    it('should return a readable date for a v2 certificate', function () {
      store.dispatch(updateCertificateDefinition(v2Fixture));
      const state = store.getState();

      expect(getIssueDate(state)).toBe('Jan 23, 2018');
    });
  });
});
