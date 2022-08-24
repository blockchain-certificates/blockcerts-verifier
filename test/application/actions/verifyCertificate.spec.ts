import { configureStore } from '../../../src/store';
import verifyCertificate from '../../../src/actions/verifyCertificate';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import { getFinalStep, getVerifiedSteps } from '../../../src/selectors/certificate';
import getInitialState from '../../../src/store/getInitialState';
import validCertificateFixture from '../../fixtures/v2/valid-certificate-example.json';
import invalidCertificateFixture from '../../fixtures/v2/invalid-certificate-example.json';
import initialValidCertificateStepsAssertions from '../../assertions/initialValidCertificateSteps';
import validCertificateStepsAssertions from '../../assertions/validCertificateSteps';
import invalidCertificateStepsAssertions from '../../assertions/invalidCertificateSteps';
import { getVerificationStatus } from '../../../src/selectors/verification';
import * as CERTIFICATE_EVENTS from '../../../src/constants/certificateEvents';
import stubCertificateVerify from '../__helpers/stubCertificateVerify';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';

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
    });

    afterEach(function () {
      store = null;
    });

    describe('given the action is triggered', function () {
      stubCertificateVerify(validCertificateFixture);

      beforeEach(function () {
        store.dispatch(updateCertificateDefinition(validCertificateFixture));
      });

      it('should set the verificationStatus in the state to started', function () {
        store.dispatch(verifyCertificate());

        const state = store.getState();

        expect(getVerificationStatus(state)).toBe(VERIFICATION_STATUSES.STARTING);
      });

      it('should emit the certificate-verify event with the certificate id', function () {
        let wasCalled = false;
        function assertFunction (e) {
          wasCalled = true;
          expect(e.detail.certificateDefinition.id).toEqual(validCertificateFixture.id);
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
        stubCertificateVerify(validCertificateFixture);
        let store;

        beforeEach(async function () {
          store = configureStore();
          store.dispatch(updateCertificateDefinition(validCertificateFixture));
          await store.dispatch(verifyCertificate());
        });

        it('should set the verificationStatus in the state to success', async function () {
          const state = store.getState();
          expect(getVerificationStatus(state)).toBe(VERIFICATION_STATUSES.SUCCESS);
        });

        it('should set the finalStep property in the state', async function () {
          const state = store.getState();
          expect(getFinalStep(state)).toEqual({
            label: 'Verified',
            // eslint-disable-next-line no-template-curly-in-string
            description: 'This is a valid ${chain} certificate.',
            linkText: 'View transaction link'
          });
        });

        it('should store the different steps in the state', async function () {
          const state = store.getState();
          expect(getVerifiedSteps(state)).toEqual(validCertificateStepsAssertions);
        });
      });
    });

    describe('given there is an invalid certificate in the state', function () {
      stubCertificateVerify(invalidCertificateFixture, [], false);

      it('should store the different steps in the state', async function () {
        store.dispatch(updateCertificateDefinition(invalidCertificateFixture));
        await store.dispatch(verifyCertificate());

        const state = store.getState();

        expect(getVerifiedSteps(state)).toEqual(invalidCertificateStepsAssertions);
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
