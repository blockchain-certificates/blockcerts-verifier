import domain from '../../../../../src/domain';

describe('domain certificates isPathToCertificateValidURI method test suite', function () {
  describe('given the test value is a URL', function () {
    it('should return true', function () {
      const testValue = 'https://www.blockcerts.org';
      expect(domain.certificates.isPathToCertificateValidURI(testValue)).toBe(true);
    });
  });

  describe('given the test value is a relative path', function () {
    it('should return true', function () {
      const testValue = './certs/blockcerts.json';
      expect(domain.certificates.isPathToCertificateValidURI(testValue)).toBe(true);
    });
  });

  describe('given the test value is a json string', function () {
    it('should return false', function () {
      const testValue = '{ "@context": ["https://www.w3.org/2018/credentials/v1", "https://www.blockcerts.org/schema/3.0-alpha/context.json", "https://www.w3.org/2018/credentials/examples/v1"] }';
      expect(domain.certificates.isPathToCertificateValidURI(testValue)).toBe(false);
    });
  });

  describe('given the test value is just a string', function () {
    it('should return false', function () {
      const testValue = 'test';
      expect(domain.certificates.isPathToCertificateValidURI(testValue)).toBe(false);
    });
  });
});
