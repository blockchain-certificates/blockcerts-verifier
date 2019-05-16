import { configureStore } from '../../../src/store';
import getInitialState from '../../../src/store/getInitialState';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import {
  getCertificateDefinition,
  getVerifiedSteps,
  getTransactionLink,
  getChain
} from '../../../src/selectors/certificate';
import { getErrorMessage } from '../../../src/selectors/error';
import * as CERTIFICATE_EVENTS from '../../../src/constants/certificateEvents';
import certificateFixture from '../../fixtures/valid-certificate-example';
import notACertificateDefinition from '../../fixtures/not-a-certificate-definition';
import initialValidCertificateStepsAssertions from '../../assertions/initialValidCertificateSteps';
import validCertificateSteps from '../../assertions/validCertificateSteps';
import validCertificate from '../../assertions/validCertificate';
import { getVerificationHasStarted } from '../../../src/selectors/verification';

jest.mock('../../../src/helpers/stepQueue');

describe('updateCertificateDefinition action creator test suite', function () {
  describe('given it is dispatched with a certificate definition', function () {
    let store;

    beforeEach(function () {
      // for convenience we avoid triggering to whole verification process automatically
      const apiConfiguration = {
        disableAutoVerify: true
      };
      const initialState = getInitialState(apiConfiguration);
      store = configureStore(initialState);
    });

    afterEach(function () {
      store = null;
    });

    it('should set the certificate definition in the state', async function () {
      await store.dispatch(updateCertificateDefinition(certificateFixture));
      const state = store.getState();

      expect(getCertificateDefinition(state).id).toEqual(validCertificate.id);
    });

    it('should set the error in the state to undefined', async function () {
      // initially trigger an error in the state
      await store.dispatch(updateCertificateDefinition(notACertificateDefinition));
      await store.dispatch(updateCertificateDefinition(certificateFixture));
      const state = store.getState();

      expect(getErrorMessage(state)).toBe(undefined);
    });

    it('should emit the certificate-load event with the certificate id', function () {
      let wasCalled = false;
      function assertFunction (e) {
        wasCalled = true;
        expect(e.detail.certificateDefinition.id).toEqual(validCertificate.id);
      }
      window.addEventListener(CERTIFICATE_EVENTS.CERTIFICATE_LOAD, assertFunction);

      store.dispatch(updateCertificateDefinition(certificateFixture));

      // add failsafe, if no expect is called test is false positive
      expect(wasCalled).toBe(true);
      window.removeEventListener(CERTIFICATE_EVENTS.CERTIFICATE_LOAD, assertFunction);
    });

    it('should set the transactionLink in the state', async function () {
      await store.dispatch(updateCertificateDefinition(certificateFixture));
      const state = store.getState();

      const expectedOutput = 'https://testnet.blockchain.info/tx/62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea';
      expect(getTransactionLink(state)).toBe(expectedOutput);
    });

    it('should set the chain of the certificate in the state', async function () {
      await store.dispatch(updateCertificateDefinition(certificateFixture));
      const state = store.getState();

      const expectedOutput = 'Bitcoin Testnet';
      expect(getChain(state)).toBe(expectedOutput);
    });

    describe('given the disableAutoVerify flag is true', function () {
      it('should set the verifiedSteps property according to the certificate\'s verificationSteps', async function () {
        const apiConfiguration = {
          disableAutoVerify: true
        };
        const initialState = getInitialState(apiConfiguration);
        const store = configureStore(initialState);

        await store.dispatch(updateCertificateDefinition(certificateFixture));
        const state = store.getState();

        expect(getVerifiedSteps(state)).toEqual(initialValidCertificateStepsAssertions);
      });
    });

    describe('given the disableAutoVerify flag is false', function () {
      it('should automatically start the verification process', async function () {
        const apiConfiguration = {
          disableAutoVerify: false
        };
        const initialState = getInitialState(apiConfiguration);
        const store = configureStore(initialState);

        await store.dispatch(updateCertificateDefinition(certificateFixture));
        const state = store.getState();

        expect(getVerifiedSteps(state)).toEqual(validCertificateSteps);
      });
    });
  });

  describe('given it is dispatched with a non-valid certificate definition', function () {
    let store;

    beforeEach(function () {
      const initialState = getInitialState();
      store = configureStore(initialState);
    });

    afterEach(function () {
      store = null;
    });

    it('should not set the definition in the state', async function () {
      await store.dispatch(updateCertificateDefinition(notACertificateDefinition));
      const state = store.getState();

      expect(getCertificateDefinition(state)).toBe(null);
    });

    it('should set the error in the state', async function () {
      await store.dispatch(updateCertificateDefinition(notACertificateDefinition));
      const state = store.getState();

      expect(getErrorMessage(state)).toBe('Not a valid Blockcerts definition.');
    });

    it('should not start the verification process', async function () {
      await store.dispatch(updateCertificateDefinition(notACertificateDefinition));
      const state = store.getState();

      expect(getVerificationHasStarted(state)).toBe(false);
    });
  });
});
