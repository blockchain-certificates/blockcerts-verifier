import { configureStore } from '../../../../src/store';
import updateFinalStep from '../../../../src/actions/updateFinalStep';
import { mapStateToProps } from '../../../../src/components/atoms/FinalVerificationStep/FinalVerificationStepContainer';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/v2/valid-certificate-example.json';
import mainnetCertificateFixture from '../../../fixtures/v2/ethereum-main-valid-2.0.json';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';
import updateVerificationStatus from '../../../../src/actions/updateVerificationStatus';
import { Signers, VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';

describe('FinalVerificationStepContainer test suite', function () {
  describe('mapStateToProps function', function () {
    let store;

    beforeEach(function () {
      store = configureStore();
    });

    afterEach(function () {
      store = null;
    });

    it('should retrieve the final step as set in the state', function () {
      const fixtureFinalStep = {
        label: 'Success',
        description: 'This was a complete success',
        linkText: 'View more about the success'
      };
      store.dispatch(updateFinalStep(fixtureFinalStep));
      const state = store.getState();

      expect(mapStateToProps(state).finalStep).toEqual(fixtureFinalStep);
    });

    describe('given the certificate is a test chain', function () {
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
        store.dispatch(updateCertificateDefinition(certificateFixture));
      });

      it('should retrieve the chain as set in the state', function () {
        const state = store.getState();

        const expectedOutput = 'Bitcoin Testnet';
        expect(mapStateToProps(state).chain[0]).toBe(expectedOutput);
      });

      it('should retrieve the transactionLink as set in the state', function () {
        const state = store.getState();

        const expectedOutput = 'https://testnet.blockchain.info/tx/62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea';
        expect(mapStateToProps(state).transactionLink[0]).toBe(expectedOutput);
      });

      describe('given the certificate is issued on a test chain', function () {
        it('should set the isTestChain property to true', function () {
          const state = store.getState();
          expect(mapStateToProps(state).isTestChain).toBe(true);
        });
      });
    });

    describe('given the certificate is issued on a mainnet chain', function () {
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

      it('should set the isTestChain property to false', function () {
        store.dispatch(updateCertificateDefinition(mainnetCertificateFixture));
        const state = store.getState();
        expect(mapStateToProps(state).isTestChain).toBe(false);
      });
    });

    describe('given the verification is a success', function () {
      it('should get the status property', async function () {
        store.dispatch(updateVerificationStatus(VERIFICATION_STATUSES.SUCCESS));

        const state = store.getState();
        expect(mapStateToProps(state).status).toBe(VERIFICATION_STATUSES.SUCCESS);
      });
    });

    describe('given the verification is a failure', function () {
      it('should get the status property', async function () {
        store.dispatch(updateVerificationStatus(VERIFICATION_STATUSES.FAILURE));

        const state = store.getState();
        expect(mapStateToProps(state).status).toBe(VERIFICATION_STATUSES.FAILURE);
      });
    });
  });
});