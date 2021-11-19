import sinon from 'sinon';
import domain from '../../../../../src/domain';
import certificateFixture from '../../../../fixtures/v2/valid-certificate-example.json';
import notACertificateDefinition from '../../../../fixtures/not-a-certificate-definition.json';
import validCertificate from '../../../../assertions/validCertificate';
import * as verifier from '@blockcerts/cert-verifier-js';
import { CertificateOptions } from '@blockcerts/cert-verifier-js';

describe('domain certificates parse method test suite', function () {
  describe('given a valid definition of a certificate', function () {
    let certificate;

    beforeEach(async function () {
      certificate = await domain.certificates.parse(certificateFixture);
    });

    it('should return an object with a certificate definition', function () {
      expect(certificate.certificateDefinition.id).toEqual(validCertificate.id);
    });

    it('should return an object with errorMessage property undefined', function () {
      expect(certificate.errorMessage).toBe(undefined);
    });
  });

  describe('given an invalid definition of a certificate', function () {
    let certificate;

    beforeEach(async function () {
      certificate = await domain.certificates.parse(notACertificateDefinition);
    });

    it('should return an object with a null certificate definition', function () {
      expect(certificate.certificateDefinition).toBe(null);
    });

    it('should return an object with errorMessage property describing the error', function () {
      expect(certificate.errorMessage).toBe('errors.invalidBlockcerts');
    });
  });

  describe('handling localization', function () {
    let certificateConstructorStub;

    beforeEach(function () {
      certificateConstructorStub = sinon.stub(verifier, 'Certificate');
    });

    afterEach(function () {
      certificateConstructorStub.restore();
    });

    describe('given no locale has been set as an option', function () {
      it('should call the Certificate constructor with the locale set to auto', async function () {
        await domain.certificates.parse(certificateFixture);
        expect(certificateConstructorStub.firstCall.args[1].locale).toBe('auto');
      });
    });

    describe('given the locale has been set to auto as an option', function () {
      it('should call the Certificate constructor with the locale set to auto', async function () {
        await domain.certificates.parse(certificateFixture, { locale: 'auto' });
        expect(certificateConstructorStub.firstCall.args[1].locale).toBe('auto');
      });
    });

    describe('given the locale has been set to a specific language as an option', function () {
      it('should call the Certificate constructor with the locale set accordingly', async function () {
        await domain.certificates.parse(certificateFixture, { locale: 'fr' });
        expect(certificateConstructorStub.firstCall.args[1].locale).toBe('fr');
      });
    });
  });

  describe('handling custom blockchain explorers', function () {
    describe('given it is set as an option', function () {
      it('should pass it as an option to the Certificate constructor', async function () {
        const certificateConstructorStub = sinon.stub(verifier, 'Certificate');
        const fixtureOptions: CertificateOptions = {
          explorerAPIs: [{
            priority: 0,
            parsingFunction: (): any => {},
            serviceURL: 'test.com'
          }]
        };
        await domain.certificates.parse(certificateFixture, fixtureOptions);
        expect(certificateConstructorStub.firstCall.args[1].explorerAPIs).toEqual(fixtureOptions.explorerAPIs);
        certificateConstructorStub.restore();
      });
    });
  });
});
