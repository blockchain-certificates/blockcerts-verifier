import { configureStore } from '../../../src/store';
import verifyCertificate from '../../../src/actions/verifyCertificate';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import { getFinalStep, getVerifiedSteps } from '../../../src/selectors/certificate';
import getInitialState from '../../../src/store/getInitialState';
import validCertificateFixture from '../../fixtures/valid-certificate-example';
import invalidCertificateFixture from '../../fixtures/invalid-certificate-example';
import initialValidCertificateStepsAssertions from '../../assertions/initialValidCertificateSteps';
import validCertificateStepsAssertions from '../../assertions/validCertificateSteps';
import invalidCertificateStepsAssertions from '../../assertions/invalidCertificateSteps';
import { getVerificationStatus } from '../../../src/selectors/verification';
import VERIFICATION_STATUS from '../../../src/constants/verificationStatus';
import * as CERTIFICATE_EVENTS from '../../../src/constants/certificateEvents';
import validCertificate from '../../assertions/validCertificate';

jest.mock('../../../src/helpers/stepQueue');

describe('verifyCertificate action creator test suite', function () {
  describe('given the verification of certificates is not disabled', function () {
    let store;

    beforeEach(function () {
      const apiConfiguration = {
        disableAutoVerify: true
      };
      const initialState = getInitialState(apiConfiguration);
      store = configureStore(initialState);
      // add a certificate definition to be verified
      store.dispatch(updateCertificateDefinition(validCertificateFixture));
    });

    afterEach(function () {
      store = null;
    });

    describe('given the action is triggered', function () {
      it('should set the verificationStatus in the state to started', function () {
        store.dispatch(verifyCertificate());

        const state = store.getState();

        expect(getVerificationStatus(state)).toBe(VERIFICATION_STATUS.STARTED);
      });

      it('should emit the certificate-verify event with the certificate id', function () {
        let wasCalled = false;
        function assertFunction (e) {
          wasCalled = true;
          expect(e.detail.certificateDefinition.id).toEqual(validCertificate.id);
        }
        window.addEventListener(CERTIFICATE_EVENTS.CERTIFICATE_VERIFY, assertFunction);
        store.dispatch(verifyCertificate());

        // add failsafe, if no expect is called test is false positive
        expect(wasCalled).toBe(true);
        // only expect once
        window.removeEventListener(CERTIFICATE_EVENTS.CERTIFICATE_VERIFY, assertFunction);
      });
    });

    describe('given the verification has ended', function () {
      describe('and the verification was of a valid certificate', function () {
        it('should set the verificationStatus in the state to success', async function () {
          await store.dispatch(verifyCertificate());

          const state = store.getState();

          expect(getVerificationStatus(state)).toBe(VERIFICATION_STATUS.SUCCESS);
        });

        it('should set the finalStep property in the state', async function () {
          await store.dispatch(verifyCertificate());

          const state = store.getState();
          expect(getFinalStep(state)).toEqual({
            label: 'Verified',
            // eslint-disable-next-line no-template-curly-in-string
            description: 'This is a valid ${chain} certificate.',
            linkText: 'View transaction link'
          });
        });
      });
    });

    describe('given there is a valid certificate in the state', function () {
      it('should store the different steps in the state', async function () {
        await store.dispatch(verifyCertificate());

        const state = store.getState();

        expect(getVerifiedSteps(state)).toEqual(validCertificateStepsAssertions);
      });
    });

    describe('given there is an invalid certificate in the state', function () {
      it('should store the different steps in the state', async function () {
        store.dispatch(updateCertificateDefinition(invalidCertificateFixture));
        await store.dispatch(verifyCertificate());

        const state = store.getState();

        expect(getVerifiedSteps(state)).toEqual(invalidCertificateStepsAssertions);
      });
    });

    describe('verifying a second certificate', function () {
      describe('given the certificates definitions valid definitions', function () {
        it('should only maintain the verifiedSteps of the latest certificate verified', async function () {
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
        disableVerify: true
      };
      const initialState = getInitialState(apiConfiguration);
      const store = configureStore(initialState);

      await store.dispatch(updateCertificateDefinition(validCertificateFixture));
      await store.dispatch(verifyCertificate());

      const state = store.getState();

      expect(getVerifiedSteps(state)).toEqual(initialValidCertificateStepsAssertions);
    });
  });
});
