import domain from '../../../../../src/domain';
import * as VERIFICATION_STATUS from '../../../../../src/constants/verificationStatus';

describe('domain verification create use case test suite', function () {
  describe('given it is called with a step definition', function () {
    const label = 'Jean Michel';
    const code = 'jeanmimi';
    let definition;
    let sut;

    beforeEach(function () {
      definition = {
        label,
        code
      };

      sut = domain.verification.createStep(definition);
    });

    afterEach(function () {
      definition = null;
      sut = null;
    });

    it('should set the label of the step', function () {
      expect(sut.label).toBe(label);
    });

    it('should set the code of the step', function () {
      expect(sut.code).toBe(code);
    });

    it('should set the default status of the step', function () {
      expect(sut.status).toBe(VERIFICATION_STATUS.DEFAULT);
    });

    describe('given the step does not have a parent', function () {
      it('should not set the parentStep property', function () {
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

      const sut = domain.verification.createStep(definition);

      expect(sut.errorMessage).toEqual(errorMessage);
    });
  });

  describe('given the step has a parent', function () {
    it('should set the parentStep property', function () {
      const label = 'Computing local hash';
      const code = 'computeLocalHash';
      const definition = {
        label,
        code
      };

      const sut = domain.verification.createStep(definition);

      expect(sut.parentStep).toBe('formatValidation');
    });
  });
});
