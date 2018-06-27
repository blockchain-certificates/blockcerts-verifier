import Step, { DEFAULT_STATUS } from '../../../../../src/domain/verification/entities/step';

describe('verification Step entity test suite', function () {
  describe('given it is instantiated with valid data', function () {
    const name = 'Jean Michel';
    const code = 'jeanmimi';
    let definition;
    let sut;

    beforeEach(function () {
      definition = {
        name,
        code
      };

      sut = new Step(definition);
    });

    afterEach(function () {
      definition = null;
      sut = null;
    });

    it('should set the name of the entity object', function () {
      expect(sut.name).toBe(name);
    });

    it('should set the code of the entity object', function () {
      expect(sut.code).toBe(code);
    });

    it('should set an empty array for the substeps', function () {
      expect(sut.substeps).toEqual([]);
    });

    it('should set the initial status of the step', function () {
      expect(sut.status).toBe(DEFAULT_STATUS);
    })
  });

  describe('addSubstep method', function () {
    it('should add the substep passed to the substep list', function () {
      const sut = new Step({
        name: 'Parent step',
        code: 'ps'
      });

      const substepDefinition = {
        name: 'Substep 1',
        code: 'substep1'
      };

      const substep = new Step(substepDefinition);

      sut.addSubstep(substep);

      expect(sut.substeps.length).toBe(1);
      expect(sut.substeps[0].name).toBe('Substep 1');
    });
  });
});
