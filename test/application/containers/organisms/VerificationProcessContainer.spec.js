import { mapStateToProps } from '../../../../src/components/organisms/VerificationProcess/VerificationProcessContainer';
import { configureStore } from '../../../../src/store';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/valid-certificate-example';
import invalidCertificateFixture from '../../../fixtures/invalid-certificate-example';
import mainnetCertificateFixture from '../../../fixtures/ethereum-main-valid-2.0';
import validCertificateStepsAssertions from '../../../assertions/validCertificateSteps';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';

jest.mock('../../../../src/helpers/stepQueue');

describe('VerificationProcessContainer test suite', function () {
  describe('mapStateToProps method', function () {
    let store;

    beforeEach(function () {
      store = configureStore();
    });

    afterEach(function () {
      store = null;
    });

    describe('given the certificate is issued on a test chain', function () {
      stubCertificateVerify(certificateFixture);

      it('should set the isTestChain property to true', function () {
        store.dispatch(updateCertificateDefinition(certificateFixture));
        const state = store.getState();
        expect(mapStateToProps(state).isTestChain).toBe(true);
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

    describe('given there are verifiedSteps set in the state', function () {
      describe('and the certificate is valid', function () {
        let store;

        beforeAll(async function () {
          store = configureStore();
          await store.dispatch(updateCertificateDefinition(certificateFixture));
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
          await store.dispatch(updateCertificateDefinition(invalidCertificateFixture));
          const state = store.getState();

          expect(mapStateToProps(state).hasError).toBe(true);
        });
      });
    });
  });
});
