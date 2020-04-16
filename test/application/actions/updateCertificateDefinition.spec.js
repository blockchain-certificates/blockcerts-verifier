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
import validCertificate from '../../assertions/validCertificate';
import { getShowVerificationModal, getVerificationHasStarted } from '../../../src/selectors/verification';
import stubCertificateVerify from '../__helpers/stubCertificateVerify';
import initialize from '../../../src/actions/initialize';

jest.mock('../../../src/helpers/stepQueue');

describe('updateCertificateDefinition action creator test suite', function () {
  describe('given it is dispatched with a certificate definition', function () {
    let store;
    stubCertificateVerify(certificateFixture);

    beforeEach(function () {
      store = configureStore();
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

    it('should emit the certificate-load event with the certificate id', async function () {
      let wasCalled = false;
      function assertFunction (e) {
        wasCalled = true;
        expect(e.detail.certificateDefinition.id).toEqual(validCertificate.id);
      }
      window.addEventListener(CERTIFICATE_EVENTS.CERTIFICATE_LOAD, assertFunction);

      await store.dispatch(updateCertificateDefinition(certificateFixture));

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

    it('should initially set the verifiedSteps property according to the certificate\'s verificationSteps', async function () {
      // check the case without automatic background verification polluting the data
      const initialState = getInitialState({
        disableVerify: true
      });
      const store = configureStore(initialState);
      await store.dispatch(updateCertificateDefinition(certificateFixture));
      const state = store.getState();

      expect(getVerifiedSteps(state)).toEqual(initialValidCertificateStepsAssertions);
    });

    it('should automatically start the verification process', async function () {
      await store.dispatch(updateCertificateDefinition(certificateFixture));
      const state = store.getState();
      expect(getVerificationHasStarted(state)).toBe(true);
    });

    describe('given the disableAutoVerify flag is true', function () {
      it('should not open the verification modal', async function () {
        const apiConfiguration = {
          disableAutoVerify: true
        };
        const initialState = getInitialState(apiConfiguration);
        const store = configureStore(initialState);
        await store.dispatch(updateCertificateDefinition(certificateFixture));
        const state = store.getState();

        expect(getShowVerificationModal(state)).toBe(false);
      });
    });

    describe('given the disableAutoVerify flag is false', function () {
      it('should open the verification modal', async function () {
        const apiConfiguration = {
          disableAutoVerify: false
        };
        const initialState = getInitialState(apiConfiguration);
        const store = configureStore(initialState);
        await store.dispatch(updateCertificateDefinition(certificateFixture));
        const state = store.getState();
        expect(getShowVerificationModal(state)).toBe(true);
      });
    });

    describe('handling locale', function () {
      describe('given no locale has been set as an option', function () {
        it('should call the Certificate constructor with the locale set to auto', async function () {
          await store.dispatch(updateCertificateDefinition(certificateFixture));
          expect(domainParseStub.firstCall.args[1].locale).toBe(undefined);
        });
      });

      describe('given the locale has been set to auto as an option', function () {
        it('should call the Certificate constructor with the locale set to auto', async function () {
          store.dispatch(initialize({ locale: 'auto' }));
          await store.dispatch(updateCertificateDefinition(certificateFixture));
          expect(domainParseStub.firstCall.args[1].locale).toBe('auto');
        });
      });

      describe('given the locale has been set to a specific language as an option', function () {
        it('should call the Certificate constructor with the locale set accordingly', async function () {
          store.dispatch(initialize({ locale: 'fr' }));
          await store.dispatch(updateCertificateDefinition(certificateFixture));
          expect(domainParseStub.firstCall.args[1].locale).toBe('fr');
        });
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

      expect(getErrorMessage(state)).toBe('errors.invalidBlockcerts');
    });

    it('should not start the verification process', async function () {
      await store.dispatch(updateCertificateDefinition(notACertificateDefinition));
      const state = store.getState();

      expect(getVerificationHasStarted(state)).toBe(false);
    });
  });
});
