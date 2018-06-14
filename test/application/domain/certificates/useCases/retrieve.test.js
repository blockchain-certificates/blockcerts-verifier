import domain from '../../../../../src/domain';
import certificateFixture from '../../../../fixtures/certificate-example';

describe('domain certificates retrieve method test suite', function () {
  describe('given a url', function () {
    it('fetches the json format from that url', async function () {
      const url = 'http://localhost:3001/to/certificate';
      const result = await domain.certificates.retrieve(url);

      expect(result).toEqual(certificateFixture);
    });
  });

  // TODO: handle failing case (no JSON answer)
  // TODO: add safe guards against invalid URL
});
