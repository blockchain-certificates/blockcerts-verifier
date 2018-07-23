import sanitize from '../../../sanitizer/sanitizer';

describe('sanitizer test suite', function () {
  // TODO: we are only testing the most obvious cases, but could do more
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet
  describe('should remove', function () {
    it('script tags', function () {
      const html = '<section><h1>Testing</h1><script>alert("XSS")</script></section>';

      const expectedOutput = '<section><h1>Testing</h1></section>';

      expect(sanitize(html)).toBe(expectedOutput);
    });

    it('style tags', function () {
      const html = '<section><h1>Testing</h1><style>alert("XSS")</style></section>';

      const expectedOutput = '<section><h1>Testing</h1></section>';

      expect(sanitize(html)).toBe(expectedOutput);
    });

    it('event attributes', function () {
      const html = '<section><h1>Testing</h1><div onclick="javascript:alert(\'yo\')">Yo</div></section>';

      const expectedOutput = '<section><h1>Testing</h1><div>Yo</div></section>';

      expect(sanitize(html)).toBe(expectedOutput);
    });

    it('dangerous instructions from a style attribute', function () {
      const html = '<section><h1>Testing</h1><div style="display:inline;background:url(java/**/script:alert(1)">Yo</div></section>';

      const expectedOutput = '<section><h1>Testing</h1><div style="display:inline;">Yo</div></section>';

      expect(sanitize(html)).toBe(expectedOutput);
    });
  });

  describe('should keep', function () {
    it('style attributes', function () {
      const html = '<section><h1>Testing</h1><div style="display:inline;">Yo</div></section>';

      const expectedOutput = '<section><h1>Testing</h1><div style="display:inline;">Yo</div></section>';

      expect(sanitize(html)).toBe(expectedOutput);
    });

    it('class attributes', function () {
      const html = '<section><h1>Testing</h1><div class="content">Yo</div></section>';

      const expectedOutput = '<section><h1>Testing</h1><div class="content">Yo</div></section>';

      expect(sanitize(html)).toBe(expectedOutput);
    });

    it('valid href attribute', function () {
      const html = '<section><h1>Testing</h1><div><a href="http://lm.com/yo.html">Yo</a></div></section>';

      const expectedOutput = '<section><h1>Testing</h1><div><a href="http://lm.com/yo.html">Yo</a></div></section>';

      expect(sanitize(html)).toBe(expectedOutput);
    });

    it('valid src attribute', function () {
      const html = '<section><h1>Testing</h1><div><img src="http://lm.com/yo.jpg" alt="MultiYO" />Yo</div></section>';

      const expectedOutput = '<section><h1>Testing</h1><div><img src="http://lm.com/yo.jpg" alt="MultiYO" />Yo</div></section>';

      expect(sanitize((html))).toBe(expectedOutput);
    });
  });
});
