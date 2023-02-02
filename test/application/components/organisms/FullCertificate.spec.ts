import sinon from 'sinon';
import * as litUnsafeHTML from 'lit-html/lib/unsafe-html.js';
import { FullCertificateComponent, FullCertificate } from '../../../../src/components/organisms/FullCertificate/FullCertificate';
import { assertClassInStringBits, assertStringInValues } from '../helpers/assertStringValues';

describe('FullCertificate wrapper function test suite', function () {
  describe('setting the attributes of the API to the webcomponent', function () {
    it('- clickableUrls', function () {
      const instance = FullCertificate({});
      expect(instance.strings[0].includes('clickableUrls')).toBe(true);
    });

    it('- hasCertificateDefinition', function () {
      const instance = FullCertificate({});
      expect(instance.strings[1].includes('hasCertificateDefinition')).toBe(true);
    });

    it('- displayHTML', function () {
      const instance = FullCertificate({});
      expect(instance.strings[2].includes('displayHTML')).toBe(true);
    });
  });

  describe('passing the API values to the webcomponent', function () {
    it('- clickableUrls', function () {
      const instance = FullCertificate({ clickableUrls: true });
      expect(instance.values[0]).toBe(true);
    });

    it('- hasCertificateDefinition', function () {
      const instance = FullCertificate({ hasCertificateDefinition: true });
      expect(instance.values[1]).toBe(true);
    });

    it('- displayHTML', function () {
      const fixtureHtml = '<div>Yo</div>';
      const instance = FullCertificate({ displayHTML: fixtureHtml });
      expect(instance.values[2]).toBe(fixtureHtml);
    });
  });
});
describe('FullCertificate component test suite', function () {
  describe('_render method', function () {
    describe('given there is no certificate definition', function () {
      it('should return null', function () {
        const instance = new FullCertificateComponent();
        const result = instance._render({ hasCertificateDefinition: false });
        expect(result).toBeNull();
      });
    });

    describe('given the certificate has a displayHTML property', function () {
      let instance;

      beforeEach(function () {
        instance = new FullCertificateComponent();
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
        const instance = new FullCertificateComponent();
        const result = instance._render({ hasCertificateDefinition: true });
        const instanceAsString = JSON.stringify(result);
        expect(instanceAsString).toContain('buv-full-certificate-v1');
      });
    });
  });
});
