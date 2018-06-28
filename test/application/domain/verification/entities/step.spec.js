import Step from '../../../../../src/domain/verification/entities/step';
import * as VERIFICATION_STATUS from '../../../../../src/constants/verificationStatus';

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

    it('should set the initial status of the step', function () {
      expect(sut.status).toBe(VERIFICATION_STATUS.DEFAULT);
    });

    describe('given it does not have a parent step', function () {
      it('should not set the parentStep value', function () {
        expect(sut.parentStep).toBe(undefined);
      });
    });
  });

  describe('given it has a parent step', function () {
    it('should retrieve and set the parentStep value', function () {
      const definition = {
        name: 'Fetching Remote Hash',
        code: 'fetchingRemoteHash'
      };

      const sut = new Step(definition);

      // see models/verificationSteps
      expect(sut.parentStep).toBe('formatValidation');
    });
  });
});
