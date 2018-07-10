import { configureStore } from '../../../src/store';
import verifyCertificate from '../../../src/actions/verifyCertificate';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import { getVerifiedSteps } from '../../../src/selectors/certificate';
import getInitialState from '../../../src/store/getInitialState';
import validCertificateFixture from '../../fixtures/valid-certificate-example';
import invalidCertificateFixture from '../../fixtures/invalid-certificate-example';
import validCertificateStepsAssertions from '../../assertions/validCertificateSteps';
import invalidCertificateStepsAssertions from '../../assertions/invalidCertificateSteps';
import initialVerifiedSteps from '../../assertions/initialVerifiedSteps';

describe('verifyCertificate action creator test suite', function () {
  describe('given the verification of certificates is not disabled', function () {
    let store;

    beforeEach(function () {
      const apiConfiguration = {
        disableAutoVerify: true
      };
      const initialState = getInitialState(apiConfiguration);
      store = configureStore(initialState);
    });

    afterEach(function () {
      store = null;
    });

    describe('given there is a valid certificate in the state', function () {
      it('should store the different steps in the state', async function () {
        // add a certificate definition to be verified
        await store.dispatch(updateCertificateDefinition(validCertificateFixture));
        await store.dispatch(verifyCertificate());

        const state = store.getState();

        expect(getVerifiedSteps(state)).toEqual(validCertificateStepsAssertions);
      });
    });

    describe('given there is an invalid certificate in the state', function () {
      it('should store the different steps in the state', async function () {
        // add a certificate definition to be verified
        await store.dispatch(updateCertificateDefinition(invalidCertificateFixture));
        await store.dispatch(verifyCertificate());

        const state = store.getState();

        expect(getVerifiedSteps(state)).toEqual(invalidCertificateStepsAssertions);
      });
    });

    describe('verifying a second certificate', function () {
      describe('given the certificates definitions valid definitions', function () {
        it('should only maintain the verifiedSteps of the latest certificate verified', async function () {
          // trigger initial verification
          await store.dispatch(updateCertificateDefinition(validCertificateFixture));
          await store.dispatch(verifyCertificate());

          await store.dispatch(updateCertificateDefinition(invalidCertificateFixture));
          await store.dispatch(verifyCertificate());
          const state = store.getState();

          expect(getVerifiedSteps(state)).toEqual(invalidCertificateStepsAssertions);
        });
      });
    });
  });

  describe('given the verification of certificates is disabled', function () {
    it('should not verify certificates', async function () {
      const apiConfiguration = {
        disableAutoVerify: true,
        disableVerify: true
      };
      const initialState = getInitialState(apiConfiguration);
      const store = configureStore(initialState);

      await store.dispatch(updateCertificateDefinition(validCertificateFixture));
      await store.dispatch(verifyCertificate());

      const state = store.getState();

      expect(getVerifiedSteps(state)).toEqual(initialVerifiedSteps);
    });
  });
});
