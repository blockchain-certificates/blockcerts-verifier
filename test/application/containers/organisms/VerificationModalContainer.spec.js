import { mapStateToProps, mapDispatchToProps } from '../../../../src/components/organisms/VerificationModal/VerificationModalContainer';
import { configureStore } from '../../../../src/store';
import getInitialState from '../../../../src/store/getInitialState';
import showVerificationModal from '../../../../src/actions/showVerificationModal';
import { getShowVerificationModal } from '../../../../src/selectors/verification';

describe('VerificationModalContainer test suite', function () {
  let store;

  beforeEach(function () {
    const initialState = getInitialState({ disableAutoVerify: true });
    store = configureStore(initialState);
  });

  afterEach(function () {
    store = null;
  });

  describe('mapStateToProps function', function () {
    describe('given the showVerificationModal flag is true in the state', function () {
      it('should set the isOpen property to true', function () {
        store.dispatch(showVerificationModal(true));
        const state = store.getState();
        expect(mapStateToProps(state).isOpen).toBe(true);
      });
    });

    describe('given the showVerificationModal flag is false in the state', function () {
      it('should set the isOpen property to false', function () {
        store.dispatch(showVerificationModal(false));
        const state = store.getState();
        expect(mapStateToProps(state).isOpen).toBe(false);
      });
    });
  });

  describe('mapDispatchToProps object', function () {
    describe('given the onClose method is called', function () {
      it('should set the showVerificationModal property to false in the state', function () {
        store.dispatch(showVerificationModal(true));
        store.dispatch(mapDispatchToProps.onClose());

        const state = store.getState();
        expect(getShowVerificationModal(state)).toBe(false);
      });
    });
  });
});
