import BlockcertsLogo from '../../../../src/components/atoms/BlockcertsLogo/BlockcertsLogo';
import { assertClassInStringBits } from '../helpers/assertStringValues';

describe('BlockcertsLogo test suite', function () {
  let instance;

  afterEach(function () {
    instance = null;
  });

  describe('given the className is passed', function () {
    it('should set the className', function () {
      const fixtureClass = 'buv-qa-test';
      const instance = BlockcertsLogo({ className: fixtureClass });
      expect(instance.values).toContain(fixtureClass);
    });
  });

  describe('given the showMotto is falsy', function () {
    beforeEach(function () {
      instance = BlockcertsLogo();
    });

    it('should use the simple logo', function () {
      expect(assertClassInStringBits(instance, 'buv-qa-logo--simple')).toBe(true);
    });

    it('should set the class as small', function () {
      expect(assertClassInStringBits(instance, 'buv-c-logo--small')).toBe(true);
    });
  });

  describe('given the showMotto is passed as true', function () {
    beforeEach(function () {
      instance = BlockcertsLogo({ showMotto: true });
    });

    it('should use the branded logo', function () {
      expect(assertClassInStringBits(instance, 'buv-qa-logo--branded')).toBe(true);
    });

    it('should set the class as medium', function () {
      expect(assertClassInStringBits(instance, 'buv-c-logo--medium')).toBe(true);
    });
  });
});
