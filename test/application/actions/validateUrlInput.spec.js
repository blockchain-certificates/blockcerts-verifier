import { configureStore } from '../../../src/store';
import validateUrlInput from '../../../src/actions/validateUrlInput';

describe('validateUrlInput action creator test suite', function () {
  describe('given it is dispatched with a valid url', function () {
    it('should set the input isValid property to true', function () {
      const store = configureStore();
      const fixtureUrl = 'http://certificates.learningmachine.com/to/certificate';
      store.dispatch(validateUrlInput(fixtureUrl));
      const state = store.getState();

      expect(state.input.isValid).toBe(true);
    });
  });

  describe('given it is dispatched with an invalid url', function () {
    it('should set the input isValid property to false', function () {
      const store = configureStore();
      const fixtureUrl = 'certificate';
      store.dispatch(validateUrlInput(fixtureUrl));
      const state = store.getState();

      expect(state.input.isValid).toBe(false);
    });
  });
});
