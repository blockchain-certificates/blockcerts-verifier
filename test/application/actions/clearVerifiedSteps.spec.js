import clearVerifiedSteps from '../../../src/actions/clearVerifiedSteps';
import { configureStore } from '../../../src/store';
import { getVerifiedSteps } from '../../../src/selectors/certificate';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../fixtures/valid-certificate-example';
import initialValidCertificateSteps from '../../assertions/initialValidCertificateSteps';
import stubCertificateVerify from '../__helpers/stubCertificateVerify';

describe('clearVerifiedSteps action creator test suite', function () {
  let store;

  beforeEach(function () {
    store = configureStore();
  });

  afterEach(function () {
    store = null;
  });

  describe('given there is no certificate definition in the state', function () {
    it('should return an empty array', function () {
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
    stubCertificateVerify(certificateFixture);

    it('should return the verificationSteps as defined by the parsed certificate', async function () {
      await store.dispatch(updateCertificateDefinition(certificateFixture));

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
