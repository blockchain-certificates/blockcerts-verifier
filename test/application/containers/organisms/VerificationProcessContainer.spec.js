import { mapStateToProps } from '../../../../src/components/organisms/VerificationProcess/VerificationProcessContainer';
import { configureStore } from '../../../../src/store';
import getInitialState from '../../../../src/store/getInitialState';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../../fixtures/valid-certificate-example';
import mainnetCertificateFixture from '../../../fixtures/ethereum-main-valid-2.0';
import validCertificateStepsAssertions from '../../../assertions/validCertificateSteps';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';
import { getVerifiedSteps } from '../../../../src/selectors/certificate';
import VERIFICATION_STATUS from '../../../../src/constants/verificationStatus';
import updateParentStepStatus from '../../../../src/actions/updateParentStepStatus';

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
      stubCertificateVerify(certificateFixture);

      it('should set the isTestChain property to true', async function () {
        await store.dispatch(updateCertificateDefinition(certificateFixture));
        const state = store.getState();
        expect(mapStateToProps(state).isTestChain).toBe(true);
      });
    });

    describe('given the certificate is issued on a normal chain', function () {
      stubCertificateVerify(mainnetCertificateFixture);

      it('should set the isTestChain property to false', async function () {
        await store.dispatch(updateCertificateDefinition(mainnetCertificateFixture));
        const state = store.getState();
        expect(mapStateToProps(state).isTestChain).toBe(false);
      });
    });

    describe('given there are verifiedSteps set in the state', function () {
      stubCertificateVerify(certificateFixture);

      beforeEach(async function () {
        // put some verifiedSteps items in the state
        await store.dispatch(updateCertificateDefinition(certificateFixture));
      });

      describe('and the certificate is valid', function () {
        beforeEach(async function () {
          const preState = store.getState();
          const parentSteps = getVerifiedSteps(preState);
          parentSteps.forEach(parentStep => {
            const parentCode = parentStep.code;
            // assume process has started
            parentStep.status = VERIFICATION_STATUS.STARTED;
            // prepare substeps
            parentStep.subSteps.forEach(substep => {
              substep.status = VERIFICATION_STATUS.SUCCESS;
              substep.label = substep.labelPending;
              delete substep.labelPending;
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
          parentStep.status = VERIFICATION_STATUS.STARTED;
          // prepare substeps
          parentStep.subSteps[0].status = VERIFICATION_STATUS.FAILURE;

          store.dispatch(updateParentStepStatus(parentCode));

          const state = store.getState();

          expect(mapStateToProps(state).hasError).toBe(true);
        });
      });
    });
  });
});
