import FullScreenCertificate from '../../../../src/components/organisms/FullScreenCertificate/FullScreenCertificate';
import { assertClassInStringBits } from '../helpers/assertClass';

describe('FullScreenCertificate component test suite', function () {
  describe('given there is not certificate definition', function () {
    it('should return null', function () {
      const instance = FullScreenCertificate({ hasCertificateDefinition: false });
      expect(instance).toBeNull();
    });
  });

  describe('given the certificate has a displayHTML property', function () {
    it('should render the displayHTML property', function () {
      const fixtureDisplayHTML = '<div>This is a test</div>';
      const instance = FullScreenCertificate({ displayHTML: fixtureDisplayHTML, hasCertificateDefinition: true });
      // ideally we would test that the displayHTML is rendered, but lit does not return the unsafeHTML result
      expect(assertClassInStringBits(instance, 'qa-fullscreen-certificate')).toBe(true);
    });
  });

  describe('given the certificate does not have a displayHTML property', function () {
    it('should render the certificate as v1', function () {
      const instance = FullScreenCertificate({ hasCertificateDefinition: true });
      const instanceAsString = JSON.stringify(instance);
      expect(instanceAsString).toContain('buv-full-certificate-v1');
    });
  });
});
