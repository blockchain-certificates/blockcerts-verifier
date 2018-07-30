import { mapStateToProps } from '../../../../src/components/organisms/VerificationModal/VerificationModalContainer';
import { configureStore } from '../../../../src/store';
import getInitialState from '../../../../src/store/getInitialState';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import validCertificateFixture from '../../../fixtures/valid-certificate-example';

describe('VerificationModalContainer test suite', function () {
  describe('mapStateToProps function', function () {
    describe('given there is no certificate definition in the state', function () {
      it('it should set the property isOpen to false', function () {
        const store = configureStore();
        const state = store.getState();

        expect(mapStateToProps(state).isOpen).toBe(false);
      });
    });

    describe('given there is a certificate in the state', function () {
      describe('and the disable verify flag has been set', function () {
        it('it should set the property isOpen to false', function () {
          const initialState = getInitialState({ disableVerify: true });
          const store = configureStore(initialState);
          store.dispatch(updateCertificateDefinition(validCertificateFixture));
          const state = store.getState();

          expect(mapStateToProps(state).isOpen).toBe(false);
        });
      });

      describe('and the disable verify flag has been set', function () {
        it('it should set the property isOpen to false', function () {
          const initialState = getInitialState({ disableAutoVerify: true });
          const store = configureStore(initialState);
          store.dispatch(updateCertificateDefinition(validCertificateFixture));
          const state = store.getState();

          expect(mapStateToProps(state).isOpen).toBe(false);
        });
      });

      describe('and the application should auto verify', function () {
        it('it should set the property isOpen to true', function () {
          const store = configureStore();
          store.dispatch(updateCertificateDefinition(validCertificateFixture));
          const state = store.getState();

          expect(mapStateToProps(state).isOpen).toBe(true);
        });
      });
    });
  });
});
