import { mapStateToProps } from '../../../../src/components/atoms/CertificateDetails/CertificateDetailsContainer';
import { configureStore } from '../../../../src/store';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/v2/valid-certificate-example.json';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';
import type { Signers } from '@blockcerts/cert-verifier-js';

describe('CertificateDetailsContainer test suite', function () {
  describe('mapStateToProps method', function () {
    describe('given there is a certificate definition in the state', function () {
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
      let store;

      beforeEach(async function () {
        store = configureStore();
        await store.dispatch(updateCertificateDefinition(certificateFixture));
      });

      afterEach(function () {
        store = null;
      });

      it('should retrieve the recipient\'s name', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).recipientName).toBe('Jérôme Collé');
      });

      it('should retrieve the issue date', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).issueDate).toBe('Jan 23, 2018');
      });

      it('should retrieve the issuedOn property', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).issuedOn).toBe('2018-01-23T00:43:15.978+00:00');
      });

      it('should retrieve the issuer name', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).issuerName).toBe('Auto Testnet');
      });

      it('should retrieve the transaction id', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).transactionId[0]).toBe('62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea');
      });

      it('should retrieve the issuer\'s public key', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).issuerPublicKey[0]).toBe('msgxCqNzDiezUFrgQK7GZkWDGYC3fU6vQ8');
      });
    });
  });
});
