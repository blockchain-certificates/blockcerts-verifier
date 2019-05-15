import { configureStore } from '../../../src/store';
import { getFinalStep } from '../../../src/selectors/certificate';
import updateFinalStep from '../../../src/actions/updateFinalStep';

describe('updateFinalStep action', function () {
  describe('given it is called with a successful final step definition', function () {
    const fixtureFinalStep = {
      label: 'Success',
      description: 'This was a complete success',
      linkText: 'View more about the success'
    };
    let updatedOutput = '';

    beforeEach(function () {
      const store = configureStore();
      store.dispatch(updateFinalStep(fixtureFinalStep));
      const state = store.getState();
      updatedOutput = getFinalStep(state);
    });

    it('should store the title', function () {
      expect(updatedOutput.label).toBe(fixtureFinalStep.label);
    });

    it('should store the description', function () {
      expect(updatedOutput.description).toBe(fixtureFinalStep.description);
    });

    it('should store the link text', function () {
      expect(updatedOutput.linkText).toBe(fixtureFinalStep.linkText);
    });
  });
});
