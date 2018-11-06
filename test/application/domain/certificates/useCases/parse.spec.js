import domain from '../../../../../src/domain';
import certificateFixture from '../../../../fixtures/valid-certificate-example';
import notACertificateDefinition from '../../../../fixtures/not-a-certificate-definition';
import validCertificate from '../../../../assertions/validCertificate';

describe('domain certificates parse method test suite', function () {
  describe('given a valid definition of a certificate', function () {
    it('should return an object with a certificate definition', function () {
      expect(domain.certificates.parse(certificateFixture).certificateDefinition.transactionId).toEqual(validCertificate.transactionId);
    });

    it('should return an object with errorMessage property undefined', function () {
      expect(domain.certificates.parse(certificateFixture).errorMessage).toBe(undefined);
    });
  });

  describe('given an invalid definition of a certificate', function () {
    it('should return an object with a null certificate definition', function () {
      expect(domain.certificates.parse(notACertificateDefinition).certificateDefinition).toBe(null);
    });

    it('should return an object with errorMessage property describing the error', function () {
      expect(domain.certificates.parse(notACertificateDefinition).errorMessage).toBe('Not a valid Blockcerts definition.');
    });
  });
});
