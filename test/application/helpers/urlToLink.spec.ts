import urlToLink from '../../../src/helpers/urlToLink';

const TARGET_BLANK = 'target="_blank"';
const REL_TAG = 'rel="noopener noreferrer"';

describe('urlToLink test suite', function () {
  describe('given it receives a string with no url', function () {
    it('should return the string as is', function () {
      const fixtureString = '<p>This is a test string</p>';
      expect(urlToLink(fixtureString)).toBe(fixtureString);
    });
  });

  describe('given it receives a string with a full url', function () {
    it('should return the string with an anchor link', function () {
      const fixtureString = '<p>Check this url out: https://www.blockcerts.org</p>';
      const expectedOutput = `<p>Check this url out: <a href="https://www.blockcerts.org" ${TARGET_BLANK} ${REL_TAG}>https://www.blockcerts.org</a></p>`;
      expect(urlToLink(fixtureString)).toBe(expectedOutput);
    });
  });

  describe('given it receives a string with a partial url prefixed by www', function () {
    it('should return the string with an anchor link', function () {
      const fixtureString = '<p>Check this url out: www.blockcerts.org</p>';
      // TODO: ideally generated href becomes https://www.blockcerts.org
      const expectedOutput = `<p>Check this url out: <a href="http://www.blockcerts.org" ${TARGET_BLANK} ${REL_TAG}>www.blockcerts.org</a></p>`;
      expect(urlToLink(fixtureString)).toBe(expectedOutput);
    });
  });

  describe('given it receives a string with a partial url', function () {
    it('should return the string with an anchor link', function () {
      const fixtureString = '<p>Check this url out: blockcerts.org</p>';
      // TODO: ideally generated href becomes https://www.blockcerts.org
      const expectedOutput = `<p>Check this url out: <a href="http://blockcerts.org" ${TARGET_BLANK} ${REL_TAG}>blockcerts.org</a></p>`;
      expect(urlToLink(fixtureString)).toBe(expectedOutput);
    });
  });
});
