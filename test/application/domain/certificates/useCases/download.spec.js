import domain from '../../../../../src/domain';
import downloadFlag from '../../../../../src/constants/downloadFlag';

describe('domain certificates download method test suite', function () {
  describe('given the certificate saved is hosted on Learning Machine\'s system', function () {
    it('should return the URL with the formatJson option appended', function () {
      const url = 'https://auto-certificates.learningmachine.io/certificate/0cc5fb04900856b4aeb3733af2e019df';
      const expectedOutput = url + downloadFlag;
      expect(domain.certificates.download(url)).toBe(expectedOutput);
    });
  });
});
