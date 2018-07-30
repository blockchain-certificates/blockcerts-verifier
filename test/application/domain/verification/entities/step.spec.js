import Step from '../../../../../src/domain/verification/entities/step';
import * as VERIFICATION_STATUS from '../../../../../src/constants/verificationStatus';

describe('verification Step entity test suite', function () {
  describe('given it is instantiated with valid data', function () {
    const label = 'Jean Michel';
    const code = 'jeanmimi';
    let definition;
    let sut;

    beforeEach(function () {
      definition = {
        label,
        code
      };

      sut = new Step(definition);
    });

    afterEach(function () {
      definition = null;
      sut = null;
    });

    it('should set the label of the entity object', function () {
      expect(sut.label).toBe(label);
    });

    it('should set the code of the entity object', function () {
      expect(sut.code).toBe(code);
    });

    it('should set the initial status of the step', function () {
      expect(sut.status).toBe(VERIFICATION_STATUS.DEFAULT);
    });

    describe('given it does not have a parent step', function () {
      it('should not set the parentStep value', function () {
        expect(sut.parentStep).toBe(undefined);
      });
    });
  });

  describe('given the step definition has an error message', function () {
    it('should set the errorMessage property', function () {
      const errorMessage = 'This is an error message';
      const definition = {
        label: 'Jean Michel',
        code: 'jeanmimi',
        errorMessage
      };

      const sut = new Step(definition);

      expect(sut.errorMessage).toEqual(errorMessage);
    });
  });

  describe('given it has a parent step', function () {
    it('should set the parentStep value', function () {
      const definition = {
        label: 'Fetching Remote Hash',
        code: 'fetchRemoteHash',
        parentStep: 'formatValidation'
      };

      const sut = new Step(definition);

      // see models/verificationSteps
      expect(sut.parentStep).toBe('formatValidation');
    });
  });
});
