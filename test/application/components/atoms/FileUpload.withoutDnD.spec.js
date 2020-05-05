import sinon from 'sinon';
import FileUpload from '../../../../src/components/atoms/FileUpload/FileUpload';
import { assertClassInStringBits } from '../helpers/assertStringValues';

describe('FileUpload component test suite', function () {
  describe('given the app runs on a device where drag and drop is not an optimal UX', function () {
    it('should not render the Drag and Drop hint text', function () {
      const createElementStub = sinon.stub(document, 'createElement').returns({
        ontouchstart: null
      });
      const instance = FileUpload({});
      expect(assertClassInStringBits(instance, 'qa-drag-and-drop-hint')).toBe(false);
      createElementStub.restore();
    });
  });
});
