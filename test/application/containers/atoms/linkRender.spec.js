import linkRender from '../../../../src/components/atoms/linkRender/linkRender';

describe('linkRender method', function () {
  const link = '<a href=';
  const mailLink = '<a href=\\"mailto:';
  const phoneLink = '<a href=\\"tel:';
  const targetBlank = '"target=”_blank”';
  const title = 'title';
  const value = 'http://a.dummy.link';
  describe('when type is string', function () {
    it('should render uri format if format==uri', function () {
      const type = 'string';
      const format = 'uri';
      const output = JSON.stringify(linkRender(type, format, title, value));
      expect(output)
        .toEqual(expect.stringContaining(link));
      expect(output)
        .toEqual(expect.stringContaining(targetBlank));
    });
    it('should render uri without target_blank', function () {
      const type = 'string';
      const format = 'uri';
      const targetBlankFlag = false;
      const output = JSON.stringify(linkRender(type, format, title, value, targetBlankFlag));
      expect(output)
        .toEqual(expect.stringContaining(link));
      expect(output)
        .toEqual(expect.not.stringContaining(targetBlank));
    });
    it('should render email format if format==email', function () {
      const type = 'string';
      const format = 'email';
      const output = JSON.stringify(linkRender(type, format, title, value));
      expect(output)
        .toEqual(expect.stringContaining(mailLink));
      expect(output)
        .toEqual(expect.not.stringContaining(targetBlank));
    });
    it('should render phone format if format==phoneNumber', function () {
      const type = 'string';
      const format = 'phoneNumber';
      const output = JSON.stringify(linkRender(type, format, title, value));
      expect(output)
        .toEqual(expect.stringContaining(phoneLink));
      expect(output)
        .toEqual(expect.not.stringContaining(targetBlank));
    });
    it('should render no format if format==wrong', function () {
      const type = 'string';
      const format = 'wrongFormat';
      const output = JSON.stringify(linkRender(type, format, title, value));
      expect(output)
        .toEqual(expect.not.stringContaining(link));
      expect(output)
        .toEqual(expect.not.stringContaining(targetBlank));
    });
  },
  describe('when type is not string no format', function () {
    it('should render no format', function () {
      const type = 'noString';
      const format = 'uri';
      const output = JSON.stringify(linkRender(type, format, title, value));
      expect(output)
        .toEqual(expect.not.stringContaining(link));
      expect(output)  
        .toEqual(expect.not.stringContaining(targetBlank));
    });
  }));
});
