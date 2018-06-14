import domain from '../../../../../src/domain';

describe('domain certificates retrieve method test suite', function () {
  describe('given a url', function () {
    it('fetches the json format from that url', function () {
      const url = 'http://www.com/to/certificate';

      expect(domain.certificates.retrieve(url)).toEqual({});
    });
  });
});
