import domain from '../../../../../src/domain';
import { Step } from '../../../../../src/domain/verification/entities';

describe('domain verification addSubstep use case test suite', function () {
  describe('given the parent step is not a proper instance of a Step entity', function () {
    it('should throw', function () {
      expect(() => {
        domain.verification.addSubstep({}, {});
      }).toThrow();
    });
  });

  describe('given the substep is not a proper instance of a Step entity', function () {
    it('should throw', function () {
      const parentStep = new Step({
        name: 'Test Parent',
        code: 'test'
      });

      expect(() => {
        domain.verification.addSubstep(parentStep, {});
      }).toThrow();
    });
  });

  describe('given the parent and the substep are both Step entities', function () {
    it('should add the substep to the parent substeps list', function () {
      const parentStep = new Step({
        name: 'Test Parent',
        code: 'test'
      });

      const substep = new Step({
        name: 'Substep 1',
        code: 'substep1'
      });

      domain.verification.addSubstep(parentStep, substep);

      expect(parentStep.substeps.length).toBe(1);
      expect(parentStep.substeps[0]).toEqual(substep);
    });
  });
});
