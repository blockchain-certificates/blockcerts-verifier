import { configureStore } from '../../../src/store';
import getInitialState from '../../../src/store/getInitialState';
import updateParentStepStatus from '../../../src/actions/updateParentStepStatus';
import { getParentStep, getVerifiedSteps } from '../../../src/selectors/certificate';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import certificateFixture from '../../fixtures/v2/valid-certificate-example.json';
import stubCertificateVerify from '../__helpers/stubCertificateVerify';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';

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
        const parentStep = getVerifiedSteps(preState)[1];
        const parentCode = parentStep.code;

        // prepare substep
        parentStep.subSteps[0].status = VERIFICATION_STATUSES.SUCCESS;

        store.dispatch(updateParentStepStatus(parentCode));
        const state = store.getState();

        expect(getParentStep(state, parentCode).status).toBe(VERIFICATION_STATUSES.STARTING);
      });
    });

    describe('given all child status is success', function () {
      it('should update the parentStep with the success status', function () {
        const preState = store.getState();
        const parentStep = getVerifiedSteps(preState)[0];
        const parentCode = parentStep.code;

        // assume process has started
        parentStep.status = VERIFICATION_STATUSES.STARTING;
        // prepare substeps
        parentStep.suites[0].subSteps.forEach(substep => {
          substep.status = VERIFICATION_STATUSES.SUCCESS;
        });

        store.dispatch(updateParentStepStatus(parentCode));
        const state = store.getState();

        expect(getParentStep(state, parentCode).status).toBe(VERIFICATION_STATUSES.SUCCESS);
      });
    });

    describe('given one child status is failure', function () {
      it('should update the parentStep with the failure status', function () {
        const preState = store.getState();
        const parentStep = getVerifiedSteps(preState)[0];
        const parentCode = parentStep.code;

        // prepare substep
        parentStep.suites[0].subSteps[0].status = VERIFICATION_STATUSES.FAILURE;

        store.dispatch(updateParentStepStatus(parentCode));
        const state = store.getState();

        expect(getParentStep(state, parentCode).status).toBe(VERIFICATION_STATUSES.FAILURE);
      });
    });
  });
});
