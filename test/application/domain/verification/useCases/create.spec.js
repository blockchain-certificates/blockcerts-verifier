import domain from '../../../../../src/domain';

describe('domain verification create use case test suite', function () {
  describe('given it is called with a step definition', function () {
    const name = 'Jean Michel';
    const code = 'jeanmimi';
    let definition;
    let sut;

    beforeEach(function () {
      definition = {
        name,
        code
      };

      sut = domain.verification.createStep(definition);
    });

    afterEach(function () {
      definition = null;
      sut = null;
    });

    it('should should set the code of the step', function () {
      expect(sut.name).toBe(name);
    });

    it('should should set the default status of the step', function () {
      expect(sut.code).toBe(code);
    });

    it('should should set the substeps property of the step', function () {
      expect(sut.substeps).toEqual([]);
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
        name: 'Jean Michel',
        code: 'jeanmimi',
        errorMessage
      };

      const sut = domain.verification.createStep(definition);

      expect(sut.errorMessage).toEqual(errorMessage);
    });
  });

  describe('given the step has a parent', function () {
    it('should set the parentStep property', function () {
      const name = 'Computing local hash';
      const code = 'computingLocalHash';
      const definition = {
        name,
        code
      };

      const sut = domain.verification.createStep(definition);

      expect(sut.parentStep).toBe('formatValidation');
    });
  });
});
