import { mapStateToProps } from '../../../../src/components/molecules/Button/ButtonContainer';

describe('ButtonContainer test suite', function () {
  describe('mapStateToProps method', function () {
    describe('cancelSpinner property', function () {
      describe('when the url is invalid', function () {
        it('should be true', function () {
          const fixtureState = {
            input: {
              isValid: false
            }
          };

          expect(mapStateToProps(fixtureState).cancelSpinner).toBe(true);
        });
      });

      describe('when the url is valid', function () {
        it('should be false', function () {
          const fixtureState = {
            input: {
              isValid: true
            }
          };

          expect(mapStateToProps(fixtureState).cancelSpinner).toBe(false);
        });
      });

      describe('when the url is undefined', function () {
        it('should be false', function () {
          const fixtureState = {
            input: {}
          };

          expect(mapStateToProps(fixtureState).cancelSpinner).toBe(false);
        });
      });
    });
  });
});
