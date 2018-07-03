import { configureStore } from '../../../src/store';
import validateUrlInput from '../../../src/actions/validateUrlInput';
import { getUrlIsValid } from '../../../src/selectors/input';

describe('validateUrlInput action creator test suite', function () {
  describe('given it is dispatched with true', function () {
    it('should set the input isValid property to true', function () {
      const store = configureStore();
      store.dispatch(validateUrlInput(true));
      const state = store.getState();

      expect(getUrlIsValid(state)).toBe(true);
    });
  });

  describe('given it is dispatched with false', function () {
    it('should set the input isValid property to false', function () {
      const store = configureStore();
      store.dispatch(validateUrlInput(false));
      const state = store.getState();

      expect(getUrlIsValid(state)).toBe(false);
    });
  });
});
