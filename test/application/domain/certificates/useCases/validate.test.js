import domain from '../../../../../src/domain';
import certificateFixture from '../../../../fixtures/valid-certificate-example';
import notACertificateDefinition from '../../../../fixtures/not-a-certificate-definition';

describe('domain certificates validate method test suite', function () {
  describe('given a valid definition of a certificate', function () {
    it('should return an object with isValid property set to true', function () {
      expect(domain.certificates.validate(certificateFixture).isValid).toBe(true);
    });

    it('should return an object with errorMessage property undefined', function () {
      expect(domain.certificates.validate(certificateFixture).errorMessage).toBe(undefined);
    });
  });

  describe('given an invalid definition of a certificate', function () {
    it('should return an object with isValid property set to false', function () {
      expect(domain.certificates.validate(notACertificateDefinition).isValid).toBe(false);
    });

    it('should return an object with errorMessage property describing the error', function () {
      expect(domain.certificates.validate(notACertificateDefinition).errorMessage).toBe('Not a valid Blockcerts certificate.');
    });
  });
});
