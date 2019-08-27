import { configureStore } from '../../../src/store';
import validateUrlInput from '../../../src/actions/validateUrlInput';
import { getUrlIsValid } from '../../../src/selectors/input';
import { getErrorMessage } from '../../../src/selectors/error';

describe('validateUrlInput action creator test suite', function () {
  describe('given it is dispatched with true', function () {
    let store;

    beforeEach(function () {
      store = configureStore();
      store.dispatch(validateUrlInput(true));
    });

    afterEach(function () {
      store = null;
    });

    it('should set the input isValid property to true', function () {
      const state = store.getState();
      expect(getUrlIsValid(state)).toBe(true);
    });

    it('should set an empty error message in the state', function () {
      const state = store.getState();
      expect(getErrorMessage(state)).toBe(null);
    });
  });

  describe('given it is dispatched with false', function () {
    let store;

    beforeEach(function () {
      store = configureStore();
      store.dispatch(validateUrlInput(false));
    });

    afterEach(function () {
      store = null;
    });

    it('should set the input isValid property to false', function () {
      const state = store.getState();
      expect(getUrlIsValid(state)).toBe(false);
    });

    it('should update the error message in the state', function () {
      const state = store.getState();
      expect(getErrorMessage(state)).toBe('errors.invalidUrl');
    });
  });
});
