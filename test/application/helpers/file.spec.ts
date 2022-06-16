import sinon from 'sinon';
import { forceDownloadFile } from '../../../src/helpers/file';

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
    forceDownloadFile(mockContent, mockContentType, mockContentEncoding, mockFilename, mockExtension);
  });

  afterEach(function () {
    spyClick.restore();
    mockElement = null;
  });

  describe('a link element should be created', function () {
    it('with the right href value', function () {
      expect(mockElement.href).toBe('data:application/pdf;base64,mock-content');
    });

    it('with the right download attribute value', function () {
      expect(mockElement.download).toBe('mock-file.pdf');
    });
  });

  it('the link element should be clicked', function () {
    expect(spyClick.calledOnce).toBe(true);
  });
});
