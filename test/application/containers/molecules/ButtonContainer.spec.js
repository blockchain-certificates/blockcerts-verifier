import { mapStateToProps } from '../../../../src/components/molecules/Button/ButtonContainer';
import getInitialState from '../../../../src/store/getInitialState';
import { configureStore } from '../../../../src/store';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import validCertificateDefinition from '../../../fixtures/valid-certificate-example';

describe('ButtonContainer test suite', function () {
  describe('mapStateToProps method', function () {
    describe('cancelSpinner property', function () {
      describe('when the url is invalid', function () {
        it('should be true', function () {
          const fixtureState = {
            input: {
              isValid: false
            }
          };

          expect(mapStateToProps(fixtureState).cancelSpinner).toBe(true);
        });
      });

      describe('when the url is valid', function () {
        it('should be false', function () {
          const fixtureState = {
            input: {
              isValid: true
            }
          };

          expect(mapStateToProps(fixtureState).cancelSpinner).toBe(false);
        });
      });

      describe('when the url is undefined', function () {
        it('should be false', function () {
          const fixtureState = {
            input: {}
          };

          expect(mapStateToProps(fixtureState).cancelSpinner).toBe(false);
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
