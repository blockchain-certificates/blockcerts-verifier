import { mapStateToProps } from '../../../../src/components/organisms/VerificationProcess/VerificationProcessContainer';
import { configureStore } from '../../../../src/store';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import getInitialState from '../../../../src/store/getInitialState';
import certificateFixture from '../../../fixtures/valid-certificate-example';
import mainnetCertificateFixture from '../../../fixtures/ethereum-main-valid-2.0';
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
      store.dispatch(updateCertificateDefinition(certificateFixture));
    });

    afterEach(function () {
      store = null;
    });

    describe('given there are verifiedSteps set in the state', function () {
      it('should retrieve the correct value', async function () {
        await store.dispatch(verifyCertificate());
        const state = store.getState();

        expect(mapStateToProps(state).steps).toEqual(validCertificateStepsAssertions);
      });
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
