import domain from '../../../../../src/domain';
import certificateFixtureNoWidthConstraint from '../../../../fixtures/v2/valid-certificate-example.json';
import certificateFixtureWidthConstraint from '../../../../fixtures/v2/mainnet-valid-2.0-with-width-constraint.json';

describe('domain certificates displayHtmlHasNoWidthConstraint method test suite', function () {
  describe('given the displayHtml has top level children count matching top level children with the specific format' +
    ' (no width constraint)', function () {
    let hasWidthConstraint: boolean;

    beforeEach(async function () {
      hasWidthConstraint = domain.certificates.displayHtmlHasNoWidthConstraint(certificateFixtureNoWidthConstraint.displayHtml);
    });

    it('should return true', function () {
      expect(hasWidthConstraint).toEqual(true);
    });
  });

  describe('given the displayHtml has top level children count not equaling top level children with the specific' +
    ' format (width constraint)', function () {
    let hasWidthConstraint: boolean;

    beforeEach(async function () {
      hasWidthConstraint = domain.certificates.displayHtmlHasNoWidthConstraint(certificateFixtureWidthConstraint.displayHtml);
    });

    it('should return true', function () {
      expect(hasWidthConstraint).toEqual(false);
    });
  });
});
