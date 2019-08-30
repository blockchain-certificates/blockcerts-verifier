import sinon from 'sinon';
import * as i18n from '../../../src/i18n/index';
import ensureIsSupported from '../../../src/i18n/ensureIsSupported';

describe('domain i18n ensureIsSupported use case test suite', function () {
  let supportedStub;
  let instance;

  beforeEach(function () {
    supportedStub = sinon.stub(i18n, 'getSupportedLanguages').returns(['en', 'es', 'fr']);
  });

  afterEach(function () {
    instance = null;
    supportedStub.restore();
  });

  describe('given the set locale is supported', function () {
    it('should return the set locale', function () {
      instance = ensureIsSupported('es');
      expect(instance).toBe('es');
    });

    describe('and of different case', () => {
      it('should return the set locale', () => {
        instance = ensureIsSupported('es-es');
        expect(instance).toBe('es');
      });
    });

    describe('given the set locale is RFC 3066 language format', () => {
      it('should return the language tag that first matches', () => {
        instance = ensureIsSupported('fr');
        expect(instance).toBe('fr');
      });
    });
  });

  describe('given the set locale is not supported', function () {
    it('should return the default locale', function () {
      instance = ensureIsSupported('az-az');
      expect(instance).toBe('en');
    });
  });
});
