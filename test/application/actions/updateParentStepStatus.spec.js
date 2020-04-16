import { configureStore } from '../../../src/store';
import getInitialState from '../../../src/store/getInitialState';
import updateParentStepStatus from '../../../src/actions/updateParentStepStatus';
import { getParentStep, getVerifiedSteps } from '../../../src/selectors/certificate';
import VERIFICATION_STATUS from '../../../src/constants/verificationStatus';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../fixtures/valid-certificate-example';
import oneChildCertificateFixture from '../../fixtures/one-child-certificate-example';
import stubCertificateVerify from '../__helpers/stubCertificateVerify';

describe('updateParentStepStatus action creator test suite', function () {
  let store;

  beforeEach(function () {
    const initialState = getInitialState({ disableVerify: true });
    store = configureStore(initialState);
  });

  afterEach(function () {
    store = null;
  });

  describe('given there are various substeps for a parent step', function () {
    stubCertificateVerify(certificateFixture);

    beforeEach(async function () {
      // put some verifiedSteps items in the state
      await store.dispatch(updateCertificateDefinition(certificateFixture));
    });

    describe('given the child status is success', function () {
      it('should update the parentStep with the started status', function () {
        const preState = store.getState();
        const parentStep = getVerifiedSteps(preState)[0];
        const parentCode = parentStep.code;

        // prepare substep
        parentStep.subSteps[0].status = VERIFICATION_STATUS.SUCCESS;

        store.dispatch(updateParentStepStatus(parentCode));
        const state = store.getState();

        expect(getParentStep(state, parentCode).status).toBe(VERIFICATION_STATUS.STARTED);
      });
    });

    describe('given all child status is success', function () {
      it('should update the parentStep with the success status', function () {
        const preState = store.getState();
        const parentStep = getVerifiedSteps(preState)[0];
        const parentCode = parentStep.code;

        // assume process has started
        parentStep.status = VERIFICATION_STATUS.STARTED;
        // prepare substeps
        parentStep.subSteps.forEach(substep => {
          substep.status = VERIFICATION_STATUS.SUCCESS;
        });

        store.dispatch(updateParentStepStatus(parentCode));
        const state = store.getState();

        expect(getParentStep(state, parentCode).status).toBe(VERIFICATION_STATUS.SUCCESS);
      });
    });

    describe('given one child status is failure', function () {
      it('should update the parentStep with the failure status', function () {
        const preState = store.getState();
        const parentStep = getVerifiedSteps(preState)[0];
        const parentCode = parentStep.code;

        // prepare substep
        parentStep.subSteps[0].status = VERIFICATION_STATUS.FAILURE;

        store.dispatch(updateParentStepStatus(parentCode));
        const state = store.getState();

        expect(getParentStep(state, parentCode).status).toBe(VERIFICATION_STATUS.FAILURE);
      });
    });
  });

  describe('given there is only one substep for a parent step', function () {
    describe('and the status is success', function () {
      stubCertificateVerify(oneChildCertificateFixture);

      it('should update the parentStep with the success status', async function () {
        await store.dispatch(updateCertificateDefinition(oneChildCertificateFixture));
        const preState = store.getState();
        const parentStep = getVerifiedSteps(preState)[0];
        const parentCode = parentStep.code;

        // prepare substep
        parentStep.subSteps[0].status = VERIFICATION_STATUS.SUCCESS;

        store.dispatch(updateParentStepStatus(parentCode));
        const state = store.getState();

        expect(getParentStep(state, parentCode).status).toBe(VERIFICATION_STATUS.SUCCESS);
      });
    });
  });
});
