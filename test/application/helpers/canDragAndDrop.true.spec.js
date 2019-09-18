import sinon from 'sinon';
import canDragAndDrop from '../../../src/helpers/canDragAndDrop';

describe('canDragAndDrop helper method te st suite', function () {
  let createElementStub;

  beforeAll(function () {
    createElementStub = sinon.stub(document, 'createElement').returns({});
  });

  afterAll(function () {
    createElementStub.restore();
  });

  describe('given the ontouchstart event handler is not available', function () {
    it('should return true', function () {
      expect(canDragAndDrop()).toBe(true);
    });

    describe('on the second call', function () {
      it('should use the cached value', function () {
        canDragAndDrop();
        expect(createElementStub.calledOnce).toBe(true);
        expect(createElementStub.calledTwice).toBe(false);
      });
    });
  });
});
