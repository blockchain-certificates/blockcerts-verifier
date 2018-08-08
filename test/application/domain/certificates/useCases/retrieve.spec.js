import domain from '../../../../../src/domain';
import validCertificate from '../../../../fixtures/valid-certificate-example';

const INVALID_URL = 'invalid url';
const MOCK_SERVER_VALID_URL = 'http://localhost:3001/to/certificate';
const INEXISTENT_URL = 'http://localhost:3000/to/certificate';
const NOT_CERTIFICATE_URL = 'http://www.learningmachine.com';
const VALID_LOCAL_PATH = '../../fixtures/valid-certificate-example.json';

describe('domain certificates retrieve method test suite', function () {
  describe('given a valid url', function () {
    describe('given the url is that of a certificate', function () {
      it('fetches the json format from that url', async function () {
        const result = await domain.certificates.retrieve(MOCK_SERVER_VALID_URL);
        expect(result.certificateDefinition).toEqual(validCertificate);
      });
    });

    describe('given the url is not of a certificate', function () {
      it('returns an error message', async function () {
        const result = await domain.certificates.retrieve(NOT_CERTIFICATE_URL);
        expect(result.errorMessage).toBe('Not a valid certificate URL.');
      });

      it('returns a null definition', async function () {
        const result = await domain.certificates.retrieve(NOT_CERTIFICATE_URL);
        expect(result.certificateDefinition).toBe(null);
      })
    });

    describe('given the url does not point to a live server', function () {
      it('returns an error message', async function () {
        const result = await domain.certificates.retrieve(INEXISTENT_URL);
        expect(result.errorMessage).toBe('Not a valid certificate URL.');
      });

      it('returns a null definition', async function () {
        const result = await domain.certificates.retrieve(INEXISTENT_URL);
        expect(result.certificateDefinition).toBe(null);
      })
    });
  });

  describe('given an invalid url', function () {
    it('should return null', function () {
      const result = domain.certificates.retrieve(INVALID_URL);
      expect(result).toBe(null);
    });
  });

  // failing, issue opened:
  // https://github.com/bitinn/node-fetch/issues/481
  // https://github.com/matthew-andrews/isomorphic-fetch/issues/76#issuecomment-402784514
  xdescribe('given a valid local path', function () {
    it('fetches the json format from that path', async function () {
      const result = await domain.certificates.retrieve(VALID_LOCAL_PATH);
      expect(result).toEqual(validCertificate);
    });
  });
});
