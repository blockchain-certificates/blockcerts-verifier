import { mapStateToProps } from '../../../../src/components/molecules/VerifyButton/VerifyButtonContainer';
import getInitialState from '../../../../src/store/getInitialState';
import { configureStore } from '../../../../src/store';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import validateUrlInput from '../../../../src/actions/validateUrlInput';
import validCertificateDefinition from '../../../fixtures/valid-certificate-example';
import verifyCertificate from '../../../../src/actions/verifyCertificate';

describe('VerifyButtonContainer test suite', function () {
  describe('mapStateToProps method', function () {
    describe('cancelSpinner property', function () {
      let store;

      beforeEach(function () {
        const initialState = getInitialState({ disableAutoVerify: true });
        store = configureStore(initialState);
      });

      afterEach(function () {
        store = null;
      });

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

      describe('when the verification has finished', function () {
        it('should be false', async function () {
          store.dispatch(updateCertificateDefinition(validCertificateDefinition));
          await store.dispatch(verifyCertificate());
          const state = store.getState();

          expect(mapStateToProps(state).cancelSpinner).toBe(true);
        });
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
        const initialState = getInitialState({ disableAutoVerify: true });
        const store = configureStore(initialState);

        await store.dispatch(updateCertificateDefinition(validCertificateDefinition));
        const state = store.getState();

        expect(mapStateToProps(state).isDisabled).toBe(false);
      });
    });
  });
});
