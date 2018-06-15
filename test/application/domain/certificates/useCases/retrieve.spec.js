import domain from '../../../../../src/domain';
import certificateFixture from '../../../../fixtures/certificate-example';

describe('domain certificates retrieve method test suite', function () {
  describe('given a valid url', function () {
    describe('given the url is that of a certificate', function () {
      it('fetches the json format from that url', async function () {
        const url = 'http://localhost:3001/to/certificate';
        const result = await domain.certificates.retrieve(url);

        expect(result).toEqual(certificateFixture);
      });
    });

    describe('given the url is not of a certificate', function () {
      it('does not do something', async function () {
        const url = 'https://www.learningmachine.com';
        const result = await domain.certificates.retrieve(url);

        expect(result).toEqual('Not a valid certificate url');
      });
    });
    // TODO: handle failing case (no JSON answer)
  });

  describe('given an invalid url', function () {
    it('should return null', function () {
      const url = 'this is not a url';

      const result = domain.certificates.retrieve(url);
      expect(result).toBe(null);
    });
  });
});
