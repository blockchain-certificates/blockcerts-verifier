import sinon from 'sinon';
import { forceDownloadFile, getFileExtensionFromContentType } from '../../../src/helpers/file';
import { CONTENT_TYPES } from '../../../src/constants/contentTypes';

describe('forceDownloadFile function', function () {
  const mockContent = 'mock-content';
  const mockContentType = 'application/pdf';
  const mockContentEncoding = 'base64';
  const mockFilename = 'mock-file';
  const mockExtension = 'pdf';

  let mockElement;
  let spy;
  let spyClick: sinon.SinonSpy;
  beforeEach(function () {
    spy = jest.spyOn(document, 'createElement');
    mockElement = document.createElement('a');
    spyClick = sinon.spy(mockElement, 'click');
    spy.mockReturnValue(mockElement);
  });

  afterEach(function () {
    spyClick.restore();
    mockElement = null;
  });

  describe('a link element should be created', function () {
    it('with the right href value', function () {
      forceDownloadFile(mockContent, mockContentType, mockContentEncoding, mockFilename, mockExtension);
      expect(mockElement.href).toBe('data:application/pdf;base64,mock-content');
    });

    it('with the right download attribute value', function () {
      forceDownloadFile(mockContent, mockContentType, mockContentEncoding, mockFilename, mockExtension);
      expect(mockElement.download).toBe('mock-file.pdf');
    });

    describe('given no extension is passed', function () {
      it('with the right download attribute without an extension', function () {
        forceDownloadFile(mockContent, mockContentType, mockContentEncoding, mockFilename, '');
        expect(mockElement.download).toBe('mock-file');
      });
    });
  });

  it('the link element should be clicked', function () {
    forceDownloadFile(mockContent, mockContentType, mockContentEncoding, mockFilename, mockExtension);
    expect(spyClick.calledOnce).toBe(true);
  });
});

describe('getFileExtensionFromContentType function', function () {
  describe('given the contentType is application pdf', function () {
    it('should return the pdf extension', function () {
      expect(getFileExtensionFromContentType(CONTENT_TYPES.APPLICATION_PDF)).toBe('pdf');
    });
  });

  describe('given the contentType is not application pdf', function () {
    it('should return an empty string', function () {
      expect(getFileExtensionFromContentType('text/plain')).toBe('');
    });
  });
});
