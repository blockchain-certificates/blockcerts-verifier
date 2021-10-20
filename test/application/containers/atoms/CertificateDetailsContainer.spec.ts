import { mapStateToProps } from '../../../../src/components/atoms/CertificateDetails/CertificateDetailsContainer';
import { configureStore } from '../../../../src/store';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/v2/valid-certificate-example.json';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';

describe('CertificateDetailsContainer test suite', function () {
  describe('mapStateToProps method', function () {
    describe('given there is a certificate definition in the state', function () {
      stubCertificateVerify(certificateFixture);
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

      it('should retrieve the transaction link', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).transactionLink).toBe('https://testnet.blockchain.info/tx/62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea');
      });

      it('should retrieve the transaction id', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).transactionId).toBe('62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea');
      });

      it('should retrieve the issuer\'s public key', async function () {
        const state = store.getState();
        expect(mapStateToProps(state).issuerPublicKey).toBe('ecdsa-koblitz-pubkey:msgxCqNzDiezUFrgQK7GZkWDGYC3fU6vQ8');
      });
    });
  });
});
