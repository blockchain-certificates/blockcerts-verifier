import { addImageToPDF, getPageOrientation, savePDF } from '../../../src/helpers/jspdf';
import jsPDF, { ImageCompression } from 'jspdf';
import sinon from 'sinon';

describe('getPageOrientation function', function () {
  describe('given the width is greater than the height', function () {
    it('should return a landscape orientation', function () {
      expect(getPageOrientation(200, 100)).toBe('landscape');
    });
  });

  describe('given the height is greater than the width', function () {
    it('should return a portrait orientation', function () {
      expect(getPageOrientation(100, 200)).toBe('portrait');
    });
  });
});

describe('savePDF function', function () {
  it('should save the PDF with the correct filename', function () {
    const stubSave: sinon.SinonStub = sinon.stub();
    const mockJsPDF: Partial<jsPDF> = {
      save: stubSave
    };
    const mockFileName = 'mock-file-name.pdf';
    savePDF(mockJsPDF as jsPDF, mockFileName);

    expect(stubSave.calledOnceWith(mockFileName));
  });
});

describe('addImageToPDF function', function () {
  it('should invoke the addImage function with the right parameters', function () {
    const fixtureImageData = 'mock-image-data';
    const fixtureWidth = 100;
    const fixtureHeight = 200;
    const fixtureX = 20;
    const fixtureY = 30;
    const fixtureCompression: ImageCompression = 'FAST';
    const stubAddImage: sinon.SinonStub = sinon.stub();
    const mockJsPDF: Partial<jsPDF> = {
      addImage: stubAddImage
    };
    addImageToPDF(mockJsPDF as jsPDF, fixtureImageData, fixtureWidth, fixtureHeight, fixtureX, fixtureY, fixtureCompression);

    expect(stubAddImage.getCall(0).args[0]).toEqual(
      { compression: 'FAST', format: 'PNG', height: 200, imageData: 'mock-image-data', width: 100, x: 20, y: 30 }
    );
  });
});
