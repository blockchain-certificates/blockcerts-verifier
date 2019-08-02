import { configureStore } from '../../../../src/store';
import getInitialState from '../../../../src/store/getInitialState';
import updateFinalStep from '../../../../src/actions/updateFinalStep';
import { mapStateToProps } from '../../../../src/components/atoms/FinalVerificationStep/FinalVerificationStepContainer';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/valid-certificate-example';
import mainnetCertificateFixture from '../../../fixtures/ethereum-main-valid-2.0';

describe('FinalVerificationStepContainer test suite', function () {
  describe('mapStateToProps function', function () {
    let store;

    beforeEach(function () {
      const initialState = getInitialState({ disableAutoVerify: true });
      store = configureStore(initialState);
      store.dispatch(updateCertificateDefinition(certificateFixture));
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

    describe('given the certificate is issued on a normal chain', function () {
      it('should set the isTestChain property to false', function () {
        store.dispatch(updateCertificateDefinition(mainnetCertificateFixture));
        const state = store.getState();
        expect(mapStateToProps(state).isTestChain).toBe(false);
      });
    });
  });
});
