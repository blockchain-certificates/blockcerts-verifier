import { mapStateToProps } from '../../../../src/components/organisms/VerificationProcess/VerificationProcessContainer';
import { configureStore } from '../../../../src/store';
import getInitialState from '../../../../src/store/getInitialState';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/v2/valid-certificate-example.json';
import mainnetCertificateFixture from '../../../fixtures/v2/mainnet-valid-2.0.json';
import validCertificateStepsAssertions from '../../../assertions/validCertificateSteps';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';
import { getVerifiedSteps } from '../../../../src/selectors/certificate';
import updateParentStepStatus from '../../../../src/actions/updateParentStepStatus';
import { Signers, VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';

jest.mock('../../../../src/helpers/stepQueue');

describe('VerificationProcessContainer test suite', function () {
  describe('mapStateToProps method', function () {
    let store;

    beforeEach(function () {
      const initialState = getInitialState({
        disableVerify: true
      });
      store = configureStore(initialState);
    });

    afterEach(function () {
      store = null;
    });

    describe('given the certificate is issued on a test chain', function () {
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

      it('should set the isTestChain property to true', async function () {
        await store.dispatch(updateCertificateDefinition(certificateFixture));
        const state = store.getState();
        expect(mapStateToProps(state).isTestChain).toBe(true);
      });
    });

    describe('given the certificate is issued on a mainnet chain', function () {
      const signersObjectForFixture: Signers[] = [
        {
          signingDate: '2018-02-07T23:52:16.636+00:00',
          signatureSuiteType: 'MerkleProof2017',
          issuerPublicKey: '1AwdUWQzJgfDDjeKtpPzMfYMHejFBrxZfo',
          issuerName: 'Hyland Credentials',
          issuerProfileDomain: 'blockcerts.learningmachine.com',
          issuerProfileUrl: 'https://blockcerts.learningmachine.com/issuer/5a4fe9931f607f0f3452a65e.json',
          chain: {
            code: 'bitcoin',
            name: 'Bitcoin',
            prefixes: [
              '6a20',
              'OP_RETURN '
            ],
            signatureValue: 'bitcoinMainnet',
            transactionTemplates: {
              full: 'https://blockchain.info/tx/{transaction_id}',
              raw: 'https://blockchain.info/rawtx/{transaction_id}'
            }
          } as any,
          transactionId: '2378076e8e140012814e98a2b2cb1af07ec760b239c1d6d93ba54d658a010ecd',
          transactionLink: 'https://blockchain.info/tx/2378076e8e140012814e98a2b2cb1af07ec760b239c1d6d93ba54d658a010ecd',
          rawTransactionLink: 'https://blockchain.info/rawtx/2378076e8e140012814e98a2b2cb1af07ec760b239c1d6d93ba54d658a010ecd'
        }
      ];
      stubCertificateVerify(mainnetCertificateFixture, signersObjectForFixture);

      it('should set the isTestChain property to false', async function () {
        await store.dispatch(updateCertificateDefinition(mainnetCertificateFixture));
        const state = store.getState();
        expect(mapStateToProps(state).isTestChain).toBe(false);
      });
    });

    describe('given there are verifiedSteps set in the state', function () {
      const signersObjectForFixture: Signers[] = [
        {
          signingDate: '2018-06-01T19:29:12.667+00:00',
          signatureSuiteType: 'MerkleProof2017',
          issuerPublicKey: '0x3d995ef85a8d1bcbed78182ab225b9f88dc8937c',
          issuerName: 'University of Learning',
          issuerProfileDomain: 'raw.githubusercontent.com',
          issuerProfileUrl: 'https://raw.githubusercontent.com/AnthonyRonning/https-github.com-labnol-files/master/issuer-eth-mainnet.json?raw=true',
          chain: {
            code: 'ethmain',
            name: 'Ethereum',
            prefixes: [
              '0x'
            ],
            signatureValue: 'ethereumMainnet',
            transactionTemplates: {
              full: 'https://etherscan.io/tx/{transaction_id}',
              raw: 'https://etherscan.io/tx/{transaction_id}'
            }
          } as any,
          transactionId: '0xa12c498c8fcf59ee2fe785c94c38be4797fb027e6450439a7ef30ad61d7616d3',
          transactionLink: 'https://etherscan.io/tx/0xa12c498c8fcf59ee2fe785c94c38be4797fb027e6450439a7ef30ad61d7616d3',
          rawTransactionLink: 'https://etherscan.io/tx/0xa12c498c8fcf59ee2fe785c94c38be4797fb027e6450439a7ef30ad61d7616d3'
        }
      ];
      stubCertificateVerify(mainnetCertificateFixture, signersObjectForFixture);

      beforeEach(async function () {
        // put some verifiedSteps items in the state
        await store.dispatch(updateCertificateDefinition(mainnetCertificateFixture));
      });

      describe('and the certificate is valid', function () {
        beforeEach(async function () {
          const preState = store.getState();
          const parentSteps = getVerifiedSteps(preState);
          // verification is disabled so that we manually update the steps
          parentSteps.forEach(parentStep => {
            const parentCode = parentStep.code;
            // assume process has started
            parentStep.status = VERIFICATION_STATUSES.STARTING;
            // prepare substeps
            parentStep.subSteps.forEach(subStep => {
              subStep.status = VERIFICATION_STATUSES.SUCCESS;
            });
            parentStep.suites?.forEach(suite => {
              suite.subSteps.forEach(subStep => {
                subStep.status = VERIFICATION_STATUSES.SUCCESS;
              });
            });

            store.dispatch(updateParentStepStatus(parentCode));
          });
        });

        it('should retrieve the correct value', async function () {
          const state = store.getState();
          expect(mapStateToProps(state).steps).toEqual(validCertificateStepsAssertions);
        });

        it('should set the hasError property to false', async function () {
          const state = store.getState();
          expect(mapStateToProps(state).hasError).toBe(false);
        });
      });

      describe('and one is a failure', function () {
        it('should set the hasError property to true', async function () {
          const preState = store.getState();
          const parentStep = getVerifiedSteps(preState)[0];
          const parentCode = parentStep.code;

          // assume process has started
          parentStep.status = VERIFICATION_STATUSES.STARTING;
          // prepare substeps
          parentStep.suites[0].subSteps[0].status = VERIFICATION_STATUSES.FAILURE;

          store.dispatch(updateParentStepStatus(parentCode));

          const state = store.getState();

          expect(mapStateToProps(state).hasError).toBe(true);
        });
      });
    });
  });
});
