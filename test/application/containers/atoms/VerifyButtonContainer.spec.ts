import {
  mapDispatchToProps,
  mapStateToProps
} from '../../../../src/components/atoms/VerifyButton/VerifyButtonContainer';
import getInitialState from '../../../../src/store/getInitialState';
import { configureStore } from '../../../../src/store/index';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import validCertificateDefinition from '../../../fixtures/v2/valid-certificate-example.json';
import { getShowVerificationModal, getVerificationStatus } from '../../../../src/selectors/verification';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';

describe('VerifyButtonContainer test suite', function () {
  stubCertificateVerify(validCertificateDefinition);
  let store;

  beforeEach(function () {
    store = configureStore();
  });

  afterEach(function () {
    store = null;
  });

  describe('mapStateToProps method', function () {
    describe('isDisabled property', function () {
      describe('when the disableVerify flag is set in the state', function () {
        it('should be true', function () {
          const state = getInitialState({ disableVerify: true });
          expect(mapStateToProps(state).isDisabled).toBe(true);
        });
      });

      describe('when there is no certificateDefinition to verify', function () {
        it('should be true', function () {
          const state = getInitialState();
          expect(mapStateToProps(state).isDisabled).toBe(true);
        });
      });

      describe('when there is a certificateDefinition to verify', function () {
        it('should be false', async function () {
          await store.dispatch(updateCertificateDefinition(validCertificateDefinition));
          const state = store.getState();

          expect(mapStateToProps(state).isDisabled).toBe(false);
        });
      });
    });
  });

  describe('mapDispatchToProps object', function () {
    describe('onClick method', function () {
      beforeEach(function () {
        store.dispatch(mapDispatchToProps.onClick());
      });

      it('should show the modal', function () {
        const state = store.getState();
        expect(getShowVerificationModal(state)).toBe(true);
      });

      it('should start the verification process', function () {
        const state = store.getState();
        expect(getVerificationStatus(state)).toBe(VERIFICATION_STATUSES.STARTING);
      });
    });
  });
});
