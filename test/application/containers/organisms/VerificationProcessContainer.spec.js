import { mapStateToProps } from '../../../../src/components/organisms/VerificationProcess/VerificationProcessContainer';
import { configureStore } from '../../../../src/store';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import getInitialState from '../../../../src/store/getInitialState';
import certificateFixture from '../../../fixtures/valid-certificate-example';
import validCertificateStepsAssertions from '../../../assertions/validCertificateSteps';
import verifyCertificate from '../../../../src/actions/verifyCertificate';

describe('VerificationProcessContainer test suite', function () {
  describe('mapStateToProps method', function () {
    describe('given there is a transactionLink set in the state', function () {
      it('should retrieve the correct value', async function () {
        const apiConfiguration = {
          disableAutoVerify: true
        };
        const initialState = getInitialState(apiConfiguration);
        const store = configureStore(initialState);

        await store.dispatch(updateCertificateDefinition(certificateFixture));
        const state = store.getState();

        const expectedOutput = 'https://testnet.blockchain.info/tx/62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea';
        expect(mapStateToProps(state).transactionLink).toBe(expectedOutput);
      });
    });

    describe('given there are verifiedSteps set in the state', function () {
      it('should retrieve the correct value', async function () {
        const apiConfiguration = {
          disableAutoVerify: true
        };
        const initialState = getInitialState(apiConfiguration);
        const store = configureStore(initialState);

        await store.dispatch(updateCertificateDefinition(certificateFixture));
        await store.dispatch(verifyCertificate());
        const state = store.getState();

        expect(mapStateToProps(state).steps).toEqual(validCertificateStepsAssertions);
      });
    });
  });
});
