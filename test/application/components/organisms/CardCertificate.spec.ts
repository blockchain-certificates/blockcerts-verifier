import CardCertificate from '../../../../src/components/organisms/CardCertificate/CardCertificate';
import { assertClassInStringBits, assertStringInValues } from '../helpers/assertStringValues';

describe('CardCertificate component test suite', function () {
  describe('given there is no certificate definition', function () {
    it('should return null', async function () {
      const instance = await CardCertificate({ hasCertificateDefinition: false });
      expect(instance).toBeNull();
    });
  });

  describe('given the certificate has a value for the recordLink property', function () {
    describe('and the hideRecordLink parameter is false', function () {
      it('should render the link', async function () {
        const fixtureUrl = 'https://www.test.com';
        const instance = await CardCertificate({ hasCertificateDefinition: true, recordLink: fixtureUrl });
        expect(assertStringInValues(instance, fixtureUrl)).toBe(true);
      });

      it('should render the link', async function () {
        const fixtureUrl = 'https://www.test.com';
        const instance = await CardCertificate({ hasCertificateDefinition: true, recordLink: fixtureUrl });
        expect(assertClassInStringBits(instance, 'qa-card-record-link')).toBe(true);
      });
    });

    describe('and the hideRecordLink parameter is true', function () {
      it('should render the link', async function () {
        const fixtureUrl = 'https://www.test.com';
        const instance = await CardCertificate({
          hasCertificateDefinition: true,
          recordLink: fixtureUrl,
          hideRecordLink: true
        });
        expect(assertStringInValues(instance, fixtureUrl)).toBe(false);
      });
    });
  });

  describe('given the certificate does not have a value for the recordLink property', function () {
    describe('and the hideRecordLink parameter is false', function () {
      it('should not render the link', async function () {
        const instance = await CardCertificate({ hasCertificateDefinition: true, recordLink: '' });
        expect(assertClassInStringBits(instance, 'qa-card-record-link')).toBe(false);
      });
    });
  });
});
