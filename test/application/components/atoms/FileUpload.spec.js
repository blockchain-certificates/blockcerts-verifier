import FileUpload from '../../../../src/components/atoms/FileUpload/FileUpload';
import { assertClassInStringBits } from '../helpers/assertStringValues';

describe('FileUpload component test suite', function () {
  describe('given the hideFileUpload option is true', function () {
    it('should return null', function () {
      const instance = FileUpload({ hideFileUpload: true });
      expect(instance).toBeNull();
    });
  });

  describe('given the app runs on a device where drag and drop is easy', function () {
    it('should render the Drag and Drop hint text', function () {
      const instance = FileUpload({});
      expect(assertClassInStringBits(instance, 'qa-drag-and-drop-hint')).toBe(true);
    });
  });
});
