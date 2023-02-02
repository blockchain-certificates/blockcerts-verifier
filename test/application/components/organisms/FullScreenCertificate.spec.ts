import sinon from 'sinon';
import * as litUnsafeHTML from 'lit-html/lib/unsafe-html.js';
import { FullScreenCertificateComponent, FullScreenCertificate } from '../../../../src/components/organisms/FullScreenCertificate/FullScreenCertificate';
import { assertClassInStringBits, assertStringInValues } from '../helpers/assertStringValues';

describe('FullScreenCertificate wrapper function test suite', function () {
  describe('setting the attributes of the API to the webcomponent', function () {
    it('- clickableUrls', function () {
      const instance = FullScreenCertificate({});
      expect(instance.strings[0].includes('clickableUrls')).toBe(true);
    });

    it('- hasCertificateDefinition', function () {
      const instance = FullScreenCertificate({});
      expect(instance.strings[1].includes('hasCertificateDefinition')).toBe(true);
    });

    it('- recipientName', function () {
      const instance = FullScreenCertificate({});
      expect(instance.strings[2].includes('recipientName')).toBe(true);
    });

    it('- displayHTML', function () {
      const instance = FullScreenCertificate({});
      expect(instance.strings[3].includes('displayHTML')).toBe(true);
    });

    it('- onClose', function () {
      const instance = FullScreenCertificate({});
      expect(instance.strings[4].includes('onClose')).toBe(true);
    });

    it('- disableDownloadPdf', function () {
      const instance = FullScreenCertificate({});
      expect(instance.strings[5].includes('disableDownloadPdf')).toBe(true);
    });
  });

  describe('passing the API values to the webcomponent', function () {
    it('- clickableUrls', function () {
      const instance = FullScreenCertificate({ clickableUrls: true });
      expect(instance.values[0]).toBe(true);
    });

    it('- hasCertificateDefinition', function () {
      const instance = FullScreenCertificate({ hasCertificateDefinition: true });
      expect(instance.values[1]).toBe(true);
    });

    it('- recipientName', function () {
      const fixtureName = 'Jean Jacques';
      const instance = FullScreenCertificate({ recipientName: fixtureName });
      expect(instance.values[2]).toBe(fixtureName);
    });

    it('- displayHTML', function () {
      const fixtureHtml = '<div>Yo</div>';
      const instance = FullScreenCertificate({ displayHTML: fixtureHtml });
      expect(instance.values[3]).toBe(fixtureHtml);
    });

    it('- onClose', function () {
      const fixtureOnClose = () => true;
      const instance = FullScreenCertificate({ onClose: fixtureOnClose });
      expect(instance.values[4]).toEqual(fixtureOnClose);
    });

    it('- disableDownloadPdf', function () {
      const instance = FullScreenCertificate({ disableDownloadPdf: true });
      expect(instance.values[5]).toBe(true);
    });
  });
});
describe('FullScreenCertificate component test suite', function () {
  describe('_render method', function () {
    describe('given there is no certificate definition', function () {
      it('should return null', function () {
        const instance = new FullScreenCertificateComponent();
        const result = instance._render({ hasCertificateDefinition: false });
        expect(result).toBeNull();
      });
    });

    describe('given the certificate has a displayHTML property', function () {
      let instance;

      beforeEach(function () {
        instance = new FullScreenCertificateComponent();
        // call through unsafeHTML directive
        sinon.stub(litUnsafeHTML, 'unsafeHTML').callsFake(str => str);
      });

      afterEach(function () {
        instance = null;
        sinon.restore();
      });

      it('should render the displayHTML property', function () {
        const fixtureDisplayHTML = '<div>This is a test</div>';
        const result = instance._render({ displayHTML: fixtureDisplayHTML, hasCertificateDefinition: true });
        expect(assertStringInValues(result, fixtureDisplayHTML)).toBe(true);
      });

      describe('given the displayHtml is legacy', function () {
        it('should render the displayHtml inside a parent with a width constrain CSS class', function () {
          const fixtureDisplayHTML = '<section class="text">This is a test</section>';
          const result = instance._render({ displayHTML: fixtureDisplayHTML, hasCertificateDefinition: true });
          expect(assertClassInStringBits(result, 'buv-c-certificate--fixed-width')).toBe(true);
        });
      });

      describe('given the displayHtml is not legacy', function () {
        it('should render the displayHtml inside a parent without a width constrain CSS class', function () {
          const fixtureDisplayHTML = '<div>This is a test</div>';
          const result = instance._render({ displayHTML: fixtureDisplayHTML, hasCertificateDefinition: true });
          expect(assertStringInValues(result, 'buv-c-certificate--fixed-width')).toBe(false);
        });
      });

      describe('and the displayHTML property contains a URL', function () {
        describe('and the clickableUrls flag is set to true', function () {
          it('should transform it to a clickable link', function () {
            const fixtureDisplayHTML = '<div>This is a test, click on www.blockcerts.org</div>';
            const result = instance._render({ displayHTML: fixtureDisplayHTML, hasCertificateDefinition: true, clickableUrls: true });
            expect(assertStringInValues(result, '<a href="http://www.blockcerts.org" target="_blank" rel="noopener noreferrer">www.blockcerts.org</a>')).toBe(true);
          });
        });

        describe('and the clickableUrls flag is set to false', function () {
          it('should not transform it to a clickable link', function () {
            const fixtureDisplayHTML = '<div>This is a test, click on www.blockcerts.org</div>';
            const result = instance._render({ displayHTML: fixtureDisplayHTML, hasCertificateDefinition: true, clickableUrls: false });
            expect(assertStringInValues(result, '<a href="http://www.blockcerts.org" target="_blank" rel="noopener noreferrer">www.blockcerts.org</a>')).toBe(false);
          });
        });
      });
    });

    describe('given the certificate does not have a displayHTML property', function () {
      it('should render the certificate as v1', function () {
        const instance = new FullScreenCertificateComponent();
        const result = instance._render({ hasCertificateDefinition: true });
        const instanceAsString = JSON.stringify(result);
        expect(instanceAsString).toContain('buv-full-certificate-v1');
      });
    });
  });
});
