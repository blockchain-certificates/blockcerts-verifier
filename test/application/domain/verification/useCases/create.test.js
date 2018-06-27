import domain from '../../../../../src/domain';
import { Step } from '../../../../../src/domain/verification/entities';

describe('domain verification create use case test suite', function () {
  describe('given it is called with a step definition', function () {
    it('should return an instance of a step entity', function () {
      const name = 'Jean Michel';
      const code = 'jeanmimi';
      const definition = {
        name,
        code
      };

      const sut = domain.verification.createStep(definition);

      expect(sut instanceof Step).toBe(true);
    });
  });
});
