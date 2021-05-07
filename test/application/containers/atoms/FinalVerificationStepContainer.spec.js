import { configureStore } from '../../../../src/store';
import updateFinalStep from '../../../../src/actions/updateFinalStep';
import { mapStateToProps } from '../../../../src/components/atoms/FinalVerificationStep/FinalVerificationStepContainer';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/v2/valid-certificate-example.json';
import mainnetCertificateFixture from '../../../fixtures/v2/ethereum-main-valid-2.0.json';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';
import VERIFICATION_STATUS from '../../../../src/constants/verificationStatus';
import updateVerificationStatus from '../../../../src/actions/updateVerificationStatus';

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
      stubCertificateVerify(certificateFixture);

      beforeEach(function () {
        store.dispatch(updateCertificateDefinition(certificateFixture));
      });

      it('should retrieve the chain as set in the state', function () {
        const state = store.getState();

        const expectedOutput = 'Bitcoin Testnet';
        expect(mapStateToProps(state).chain).toBe(expectedOutput);
      });

      it('should retrieve the transactionLink as set in the state', function () {
        const state = store.getState();

        const expectedOutput = 'https://testnet.blockchain.info/tx/62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea';
        expect(mapStateToProps(state).transactionLink).toBe(expectedOutput);
      });

      describe('given the certificate is issued on a test chain', function () {
        it('should set the isTestChain property to true', function () {
          const state = store.getState();
          expect(mapStateToProps(state).isTestChain).toBe(true);
        });
      });
    });

    describe('given the certificate is issued on a normal chain', function () {
      stubCertificateVerify(mainnetCertificateFixture);

      it('should set the isTestChain property to false', function () {
        store.dispatch(updateCertificateDefinition(mainnetCertificateFixture));
        const state = store.getState();
        expect(mapStateToProps(state).isTestChain).toBe(false);
      });
    });

    describe('given the verification is a success', function () {
      it('should get the status property', async function () {
        store.dispatch(updateVerificationStatus(VERIFICATION_STATUS.SUCCESS));

        const state = store.getState();
        expect(mapStateToProps(state).status).toBe(VERIFICATION_STATUS.SUCCESS);
      });
    });

    describe('given the verification is a failure', function () {
      it('should get the status property', async function () {
        store.dispatch(updateVerificationStatus(VERIFICATION_STATUS.FAILURE));

        const state = store.getState();
        expect(mapStateToProps(state).status).toBe(VERIFICATION_STATUS.FAILURE);
      });
    });
  });
});
