import { configureStore } from '../../../src/store';
import { getFinalStep } from '../../../src/selectors/certificate';
import updateFinalStep from '../../../src/actions/updateFinalStep';

describe('updateFinalStep action', function () {
  describe('given it is called with a successful final step definition', function () {
    const fixtureFinalStepMessage = {
      label: 'Success',
      description: 'This was a complete success',
      linkText: 'View more about the success'
    };
    let updatedOutput = '';

    beforeEach(function () {
      const store = configureStore();
      store.dispatch(updateFinalStep(fixtureFinalStepMessage));
      const state = store.getState();
      updatedOutput = getFinalStep(state);
    });

    it('should store the title', function () {
      expect(updatedOutput.label).toBe(fixtureFinalStepMessage.label);
    });

    it('should store the description', function () {
      expect(updatedOutput.description).toBe(fixtureFinalStepMessage.description);
    });

    it('should store the link text', function () {
      expect(updatedOutput.linkText).toBe(fixtureFinalStepMessage.linkText);
    });
  });

  // TODO: move this responsibility to cert-verifier-js
  describe('given the final step message is a string', function () {
    it('should form the message to keep a similar shape as a success message', function () {
      const fixtureFinalStepMessage = 'Could not confirm the transaction';
      const store = configureStore();
      store.dispatch(updateFinalStep(fixtureFinalStepMessage));
      const state = store.getState();
      const updatedOutput = getFinalStep(state);
      expect(updatedOutput.label).toBe(fixtureFinalStepMessage);
    });
  });
});
