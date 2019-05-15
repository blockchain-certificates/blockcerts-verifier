import clearVerifiedSteps from '../../../src/actions/clearVerifiedSteps';
import { configureStore } from '../../../src/store';
import { getVerifiedSteps } from '../../../src/selectors/certificate';
import getInitialState from '../../../src/store/getInitialState';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../fixtures/valid-certificate-example';
import initialValidCertificateSteps from '../../assertions/initialValidCertificateSteps';

describe('clearVerifiedSteps action creator test suite', function () {
  describe('given there is no certificate definition in the state', function () {
    it('should return an empty array', function () {
      const store = configureStore();
      const initialState = store.getState();
      // populate step
      initialState.verifiedSteps.push({
        code: 'test',
        name: 'test'
      });

      store.dispatch(clearVerifiedSteps());

      const state = store.getState();

      expect(getVerifiedSteps(state)).toEqual([]);
    });
  });

  describe('given there is a certificate definition in the state', function () {
    it('should return the verificationSteps as defined by the parsed certificate', function () {
      const initialState = getInitialState({ disableAutoVerify: true });
      const store = configureStore(initialState);
      store.dispatch(updateCertificateDefinition(certificateFixture));

      const preparedState = store.getState();
      // populate step
      preparedState.verifiedSteps.push({
        code: 'test',
        name: 'test'
      });

      store.dispatch(clearVerifiedSteps());

      const state = store.getState();

      expect(getVerifiedSteps(state)).toEqual(initialValidCertificateSteps);
    });
  });
});
