import {
  mapDispatchToProps,
  mapStateToProps
} from '../../../../src/components/molecules/VerifyButton/VerifyButtonContainer';
import getInitialState from '../../../../src/store/getInitialState';
import { configureStore } from '../../../../src/store';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import validateUrlInput from '../../../../src/actions/validateUrlInput';
import validCertificateDefinition from '../../../fixtures/valid-certificate-example';
import verifyCertificate from '../../../../src/actions/verifyCertificate';
import { getShowVerificationModal, getVerificationStatus } from '../../../../src/selectors/verification';
import VERIFICATION_STATUS from '../../../../src/constants/verificationStatus';
import stubCertificateVerify from '../../__helpers/stubCertificateVerify';

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
    describe('cancelSpinner property', function () {
      describe('when the value inputted is invalid', function () {
        it('should be true', function () {
          store.dispatch(validateUrlInput(false));
          const state = store.getState();

          expect(mapStateToProps(state).cancelSpinner).toBe(true);
        });
      });

      describe('when the value inputted is valid', function () {
        it('should be false', function () {
          store.dispatch(validateUrlInput(true));
          const state = store.getState();

          expect(mapStateToProps(state).cancelSpinner).toBe(false);
        });
      });

      describe('when no value was inputted', function () {
        it('should be false', function () {
          const state = store.getState();
          expect(mapStateToProps(state).cancelSpinner).toBe(false);
        });
      });

      describe('when the verification has started', function () {
        it('should be false', function () {
          store.dispatch(updateCertificateDefinition(validCertificateDefinition));
          store.dispatch(verifyCertificate());
          const state = store.getState();

          expect(mapStateToProps(state).cancelSpinner).toBe(false);
        });
      });

      describe('when the verification has finished', function () {
        it('should be true', async function () {
          store.dispatch(updateCertificateDefinition(validCertificateDefinition));
          await store.dispatch(verifyCertificate());
          const state = store.getState();

          expect(mapStateToProps(state).cancelSpinner).toBe(true);
        });
      });
    });

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
        expect(getVerificationStatus(state)).toBe(VERIFICATION_STATUS.STARTED);
      });
    });
  });
});
