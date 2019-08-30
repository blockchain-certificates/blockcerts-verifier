import currentLocale from '../../../src/i18n/valueObjects/currentLocale';
import getText from '../../../src/i18n/getText';

describe('domain i18n getText use case test suite', function () {
  describe('given it is invoked without the group', function () {
    it('should return an empty string', function () {
      const res = getText();
      expect(res).toBe('');
    });
  });

  describe('given it is invoked without the item', function () {
    it('should return an error', function () {
      const res = getText('group');
      expect(res).toBe('');
    });
  });

  describe('given it is called with a merged group item string', function () {
    it('should return the correct value', function () {
      const res = getText('errors.errorLabel');
      expect(res).toBe('Error');
    });
  });

  describe('given the usePlural flag is set to true', function () {
    describe('and the count is lower or equal to 1', function () {
      it('should return the singular version', function () {
        const res = getText('text', 'item', true, 1);
        expect(res).toBe('Item');
      });
    });

    describe('and the count is greater or equal to 1', function () {
      it('should return the plural version', function () {
        const res = getText('text', 'item', true, 2);
        expect(res).toBe('Items');
      });
    });
  });

  describe('given the current locale does not exist in the i18n data', function () {
    // TODO: is test relevant if we ensure the locale exists?
    xit('should return an error', function () {
      currentLocale.locale = 'fr-FR';
      const res = getText('group', 'item');
      expect(res).toBe('[missing locale data]');
      currentLocale.locale = 'en-US';
    });
  });

  describe('given the group data does not exist in the i18n data', function () {
    it('should return an error', function () {
      const res = getText('invalid-group', 'item');
      expect(res).toBe('[missing locale group data]');
    });
  });

  describe('given the item does not exist in the i18n data', function () {
    it('should return an error', function () {
      const res = getText('errors', 'invalid-item');
      expect(res).toBe('[missing locale item data]');
    });
  });

  describe('given the item exists in the i18n data', function () {
    it('should return the correct value', function () {
      const res = getText('errors', 'errorLabel');
      expect(res).toBe('Error');
    });
  });
});
