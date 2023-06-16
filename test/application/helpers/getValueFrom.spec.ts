import getValueFrom from '../../../src/helpers/getValueFrom';

describe('getValueFrom method', function () {
  describe('when the key value pair is defined', function () {
    it('should retrieve a value in the first level', function () {
      const testValue = 'testValue';
      const list = {
        key: testValue
      };

      const entry = 'key';

      expect(getValueFrom(list, entry)).toBe(testValue);
    });

    it('should retrieve a value in the second level', function () {
      const testValue = 'testValue';
      const list = {
        sublevel1: {
          key: testValue
        }
      };

      const entry = 'sublevel1.key';

      expect(getValueFrom(list, entry)).toBe(testValue);
    });

    it('should retrieve a value in the third level', function () {
      const testValue = 'testValue';
      const list = {
        sublevel1: {
          sublevel2: {
            key: testValue
          }
        }
      };

      const entry = 'sublevel1.sublevel2.key';

      expect(getValueFrom(list, entry)).toBe(testValue);
    });
  });
  describe('when the key value pair is not defined', function () {
    it('should return undefined in the first level', function () {
      const testValue = 'testValue';
      const list = {
        key: testValue
      };

      const entry = 'test';

      expect(getValueFrom(list, entry)).toBe(undefined);
    });

    it('should retrieve a value in the second level', function () {
      const testValue = 'testValue';
      const list = {
        sublevel1: {
          key: testValue
        }
      };

      const entry = 'sublevel1.test';

      expect(getValueFrom(list, entry)).toBe(undefined);
    });

    it('should retrieve a value in the third level', function () {
      const testValue = 'testValue';
      const list = {
        sublevel1: {
          sublevel2: {
            key: testValue
          }
        }
      };

      const entry = 'sublevel1.sublevel2.test';

      expect(getValueFrom(list, entry)).toBe(undefined);
    });
  });
});
