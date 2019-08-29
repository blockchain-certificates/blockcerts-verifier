import sinon from 'sinon';
import domain from '../../../../../src/domain';
import certificateFixture from '../../../../fixtures/valid-certificate-example';
import notACertificateDefinition from '../../../../fixtures/not-a-certificate-definition';
import validCertificate from '../../../../assertions/validCertificate';
import * as verifier from '@blockcerts/cert-verifier-js/dist/verifier-es';

describe('domain certificates parse method test suite', function () {
  describe('given a valid definition of a certificate', function () {
    it('should return an object with a certificate definition', function () {
      expect(domain.certificates.parse(certificateFixture).certificateDefinition.id).toEqual(validCertificate.id);
    });

    it('should return an object with errorMessage property undefined', function () {
      expect(domain.certificates.parse(certificateFixture).errorMessage).toBe(undefined);
    });
  });

  describe('given an invalid definition of a certificate', function () {
    it('should return an object with a null certificate definition', function () {
      expect(domain.certificates.parse(notACertificateDefinition).certificateDefinition).toBe(null);
    });

    it('should return an object with errorMessage property describing the error', function () {
      expect(domain.certificates.parse(notACertificateDefinition).errorMessage).toBe('errors.invalidBlockcerts');
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
      it('should call the Certificate constructor with the locale set to auto', function () {
        domain.certificates.parse(certificateFixture);
        expect(certificateConstructorStub.firstCall.args[1].locale).toBe('auto');
      });
    });

    describe('given the locale has been set to auto as an option', function () {
      it('should call the Certificate constructor with the locale set to auto', function () {
        domain.certificates.parse(certificateFixture, { locale: 'auto' });
        expect(certificateConstructorStub.firstCall.args[1].locale).toBe('auto');
      });
    });

    describe('given the locale has been set to a specific language as an option', function () {
      it('should call the Certificate constructor with the locale set accordingly', function () {
        domain.certificates.parse(certificateFixture, { locale: 'fr' });
        expect(certificateConstructorStub.firstCall.args[1].locale).toBe('fr');
      });
    });
  });
});
