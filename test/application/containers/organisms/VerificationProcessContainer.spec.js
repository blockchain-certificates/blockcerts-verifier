import { mapStateToProps } from '../../../../src/components/organisms/VerificationProcess/VerificationProcessContainer';
import { configureStore } from '../../../../src/store';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import getInitialState from '../../../../src/store/getInitialState';
import certificateFixture from '../../../fixtures/valid-certificate-example';
import validCertificateStepsAssertions from '../../../assertions/validCertificateSteps';
import verifyCertificate from '../../../../src/actions/verifyCertificate';

jest.mock('../../../../src/helpers/stepQueue');

describe('VerificationProcessContainer test suite', function () {
  describe('mapStateToProps method', function () {
    let store;

    beforeEach(function () {
      const apiConfiguration = {
        disableAutoVerify: true
      };
      const initialState = getInitialState(apiConfiguration);

      store = configureStore(initialState);
    });

    afterEach(function () {
      store = null;
    });

    describe('given there is a transactionLink set in the state', function () {
      it('should retrieve the correct value', function () {
        store.dispatch(updateCertificateDefinition(certificateFixture));
        const state = store.getState();

        const expectedOutput = 'https://testnet.blockchain.info/tx/62b48b3bd8ead185ac38c844648dc3f7b1dcb08283d1de6c7eb8ae9f9f5daeea';
        expect(mapStateToProps(state).transactionLink).toBe(expectedOutput);
      });
    });

    describe('given there is a chain of the certificate set in the state', function () {
      it('should retrieve the correct value', function () {
        store.dispatch(updateCertificateDefinition(certificateFixture));
        const state = store.getState();

        const expectedOutput = 'Bitcoin Testnet';
        expect(mapStateToProps(state).chain).toBe(expectedOutput);
      });
    });

    describe('given there are verifiedSteps set in the state', function () {
      it('should retrieve the correct value', async function () {
        store.dispatch(updateCertificateDefinition(certificateFixture));
        await store.dispatch(verifyCertificate());
        const state = store.getState();

        expect(mapStateToProps(state).steps).toEqual(validCertificateStepsAssertions);
      });
    });
  });
});
