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
      const fixtureOnClose = (): boolean => true;
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
        expect(result.strings).toEqual(['']);
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
  });

  describe('_shouldRender method', function () {
    let instance;

    beforeEach(function () {
      instance = new FullScreenCertificateComponent();
    });

    afterEach(function () {
      instance = null;
    });

    describe('given the displayHTML property is set in the changedProperties object', function () {
      it('should return true', function () {
        const result = instance._shouldRender(null, {
          displayHTML: '<div>Yo</div>'
        }, null);
        expect(result).toBe(true);
      });
    });

    describe('given the displayHTML property is not set in the changedProperties object', function () {
      it('should return false', function () {
        const result = instance._shouldRender(null, null, null);
        expect(result).toBe(false);
      });
    });

    describe('given the hasCertificateDefinition property is undefined', function () {
      it('should return false', function () {
        const result = instance._shouldRender(null, {}, null);
        expect(result).toBe(false);
      });
    });

    describe('given the hasCertificateDefinition property is null', function () {
      it('should return false', function () {
        const result = instance._shouldRender(null, { hasCertificateDefinition: null }, null);
        expect(result).toBe(false);
      });
    });

    describe('given the hasCertificateDefinition property is true', function () {
      it('should return false', function () {
        const result = instance._shouldRender(null, { hasCertificateDefinition: true }, null);
        expect(result).toBe(false);
      });
    });

    describe('given the hasCertificateDefinition property is false', function () {
      it('should return true', function () {
        const result = instance._shouldRender(null, { hasCertificateDefinition: false }, null);
        expect(result).toBe(true);
      });
    });
  });
});
