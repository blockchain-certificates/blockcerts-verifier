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
import certificateFixture from '../../fixtures/v2/valid-certificate-example.json';
import notACertificateDefinition from '../../fixtures/not-a-certificate-definition.json';
import initialValidCertificateStepsAssertions from '../../assertions/initialValidCertificateSteps';
import validCertificate from '../../assertions/validCertificate';
import { getShowVerificationModal, getVerificationHasStarted } from '../../../src/selectors/verification';
import stubCertificateVerify from '../__helpers/stubCertificateVerify';
import initialize from '../../../src/actions/initialize';
import { CertificateOptions, Signers } from '@blockcerts/cert-verifier-js';

jest.mock('../../../src/helpers/stepQueue');

describe('updateCertificateDefinition action creator test suite', function () {
  describe('given it is dispatched with a certificate definition', function () {
    let store;
    const signersObjectForFixture: Signers[] = [
      {
        signingDate: '2018-01-23T00:43:15.978+00:00',
        signatureSuiteType: 'MerkleProof2017',
        issuerPublicKey: 'msgxCqNzDiezUFrgQK7GZkWDGYC3fU6vQ8',
        issuerName: 'Auto Testnet',
        issuerProfileDomain: 'auto-certificates.learningmachine.io',
        issuerProfileUrl: 'https://auto-certificates.learningmachine.io/issuer/5915db9cf6548f11bcb9b9a2.json',
        chain: {
          code: 'testnet',
          name: 'Bitcoin Testnet',
          signatureValue: 'bitcoinTestnet',
          transactionTemplates: {
            full: 'https://testnet.blockchain.info/tx/{transaction_id}',
            raw: 'https://testnet.blockchain.info/rawtx/{transaction_id}'
          }
        } as any,
        transactionId: '62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea',
        transactionLink: 'https://testnet.blockchain.info/tx/62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea',
        rawTransactionLink: 'https://testnet.blockchain.info/rawtx/62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea'
      }
    ];
    stubCertificateVerify(certificateFixture, signersObjectForFixture);

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
      function assertFunction (e): void {
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
      expect(getTransactionLink(state)[0]).toBe(expectedOutput);
    });

    it('should set the chain of the certificate in the state', async function () {
      await store.dispatch(updateCertificateDefinition(certificateFixture));
      const state = store.getState();

      const expectedOutput = 'Bitcoin Testnet';
      expect(getChain(state)[0]).toBe(expectedOutput);
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
        it('should pass the locale set to auto', async function () {
          await store.dispatch(updateCertificateDefinition(certificateFixture));
          expect((global as any).domainParseStub.firstCall.args[1].locale).toBe(undefined);
        });
      });

      describe('given the locale has been set to auto as an option', function () {
        it('should pass the locale set to auto', async function () {
          store.dispatch(initialize({ locale: 'auto' }));
          await store.dispatch(updateCertificateDefinition(certificateFixture));
          expect((global as any).domainParseStub.firstCall.args[1].locale).toBe('auto');
        });
      });

      describe('given the locale has been set to a specific language as an option', function () {
        it('should pass the locale set accordingly', async function () {
          store.dispatch(initialize({ locale: 'fr' }));
          await store.dispatch(updateCertificateDefinition(certificateFixture));
          expect((global as any).domainParseStub.firstCall.args[1].locale).toBe('fr');
        });
      });
    });

    describe('given some explorerAPIs were set', function () {
      it('should pass the explorerAPIs', async function () {
        const fixtureOptions: CertificateOptions = {
          explorerAPIs: [{
            priority: 0,
            parsingFunction: (): any => {},
            serviceURL: 'test.com'
          }]
        };
        store.dispatch(initialize(fixtureOptions));
        await store.dispatch(updateCertificateDefinition(certificateFixture));
        expect((global as any).domainParseStub.firstCall.args[1].explorerAPIs).toEqual(fixtureOptions.explorerAPIs);
      });
    });

    describe('given the consumer provided a custom didUrlResolver', function () {
      it('should pass the didUrlResolver', async function () {
        const didResolverUrl = 'https://resolver.blockcerts.org';
        store.dispatch(initialize({ didResolverUrl }));
        await store.dispatch(updateCertificateDefinition(certificateFixture));
        expect((global as any).domainParseStub.firstCall.args[1].didResolverUrl).toBe(didResolverUrl);
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
