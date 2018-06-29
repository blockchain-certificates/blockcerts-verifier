import { configureStore } from '../../../src/store';
import updateParentStepStatus from '../../../src/actions/updateParentStepStatus';
import { getParentStep } from '../../../src/selectors/certificate';
import * as VERIFICATION_STATUS from '../../../src/constants/verificationStatus';
import { mainSteps } from '../../../src/models/verificationSteps';

describe('updateParentStepStatus action creator test suite', function () {
  let store;
  let parentCode;
  let parent;

  beforeEach(function () {
    store = configureStore();
    parentCode = mainSteps[0].code;
    const initialState = store.getState();
    parent = getParentStep(initialState, parentCode);
  });

  afterEach(function () {
    store = null;
    parentCode = null;
    parent = null;
  });

  describe('given the child status is success', function () {
    it('should update the parentStep with the started status', function () {
      // populate substeps
      const childStep = { status: VERIFICATION_STATUS.SUCCESS };
      parent.substeps.push(childStep);

      store.dispatch(updateParentStepStatus(parentCode));
      const state = store.getState();

      expect(getParentStep(state, parentCode).status).toBe(VERIFICATION_STATUS.STARTED);
    });
  });

  describe('given all child status is success', function () {
    it('should update the parentStep with the success status', function () {
      // populate substeps
      parent.status = VERIFICATION_STATUS.STARTED;
      const childStep1 = { status: VERIFICATION_STATUS.SUCCESS };
      const childStep2 = { status: VERIFICATION_STATUS.SUCCESS };
      parent.substeps.push(childStep1);
      parent.substeps.push(childStep2);

      store.dispatch(updateParentStepStatus(parentCode));
      const state = store.getState();

      expect(getParentStep(state, parentCode).status).toBe(VERIFICATION_STATUS.SUCCESS);
    });
  });

  describe('given one child status is failure', function () {
    it('should update the parentStep with the failure status', function () {
      // populate substeps
      const childStep = { status: VERIFICATION_STATUS.FAILURE };
      parent.substeps.push(childStep);

      store.dispatch(updateParentStepStatus(parentCode));
      const state = store.getState();

      expect(getParentStep(state, parentCode).status).toBe(VERIFICATION_STATUS.FAILURE);
    });
  });
});
