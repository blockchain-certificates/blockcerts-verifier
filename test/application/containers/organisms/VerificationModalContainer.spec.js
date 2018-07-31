import { mapStateToProps } from '../../../../src/components/organisms/VerificationModal/VerificationModalContainer';
import { configureStore } from '../../../../src/store';
import getInitialState from '../../../../src/store/getInitialState';
import updateCertificateDefinition from '../../../../src/actions/updateCertificateDefinition';
import validCertificateFixture from '../../../fixtures/valid-certificate-example';
import verifyCertificate from '../../../../src/actions/verifyCertificate';

describe('VerificationModalContainer test suite', function () {
  describe('mapStateToProps function', function () {
    describe('given there is no certificate definition in the state', function () {
      it('it should set the property isOpen to false', function () {
        const store = configureStore();
        const state = store.getState();

        expect(mapStateToProps(state).isOpen).toBe(false);
      });
    });

    describe('given a certificate was loaded in the state', function () {
      describe('and the verification process is automatic', function () {
        it('it should set the property isOpen to true', function () {
          const store = configureStore();
          store.dispatch(updateCertificateDefinition(validCertificateFixture));
          const state = store.getState();

          expect(mapStateToProps(state).isOpen).toBe(true);
        });
      });

      describe('and the disableAutoVerify flag has been set', function () {
        it('it should set the property isOpen to false', function () {
          const initialState = getInitialState({ disableAutoVerify: true });
          const store = configureStore(initialState);
          store.dispatch(updateCertificateDefinition(validCertificateFixture));
          const state = store.getState();

          expect(mapStateToProps(state).isOpen).toBe(false);
        });

        describe('and a verification process has started', function () {
          it('should set the property isOpen to true', function () {
            const initialState = getInitialState({ disableAutoVerify: true });
            const store = configureStore(initialState);
            store.dispatch(updateCertificateDefinition(validCertificateFixture));
            store.dispatch(verifyCertificate());
            const state = store.getState();

            expect(mapStateToProps(state).isOpen).toBe(true);
          });
        });
      });
    });
  });
});
