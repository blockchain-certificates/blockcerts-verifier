import domain from '../../../../../src/domain';

describe('domain certificates retrieve method test suite', function () {
  describe('given a url', function () {
    it('fetches the json format from that url', async function () {
      // TODO: make mock server
      const url = 'http://www.com/to/certificate';
      const result = await domain.certificates.retrieve(url);

      expect(result).toEqual({});
    });
  });

  // TODO: handle failing case (no JSON answer)
  // TODO: add safe guards against invalid URL
});
