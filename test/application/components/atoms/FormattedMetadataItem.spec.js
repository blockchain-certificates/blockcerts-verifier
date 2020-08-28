import FormattedMetadataItem from '../../../../src/components/atoms/FormattedMetadataItem/FormattedMetadataItem';

const FIXTURE_VALUE = 'http://a.dummy.link';
const REGULAR_LINK = '<a href=';
const TARGET_BLANK = '_blank';
const MAIL_LINK = `"mailto:${FIXTURE_VALUE}`;
const PHONE_LINK = `"tel:${FIXTURE_VALUE}`;

const FIXTURE_METADATA_OBJECT = {
  title: 'title',
  format: '',
  type: ['string', null]
};

describe('FormattedMetadataItem component', function () {
  describe('when the type is a straight string of value "string"', function () {
    it('should render uri format if format==uri', function () {
      const fixtureObject = {
        title: 'a good title',
        format: 'uri',
        type: 'string'
      };
      const output = JSON.stringify(FormattedMetadataItem(fixtureObject, FIXTURE_VALUE));
      expect(output)
        .toEqual(expect.stringContaining(REGULAR_LINK));
      expect(output)
        .toEqual(expect.stringContaining(TARGET_BLANK));
      expect(output)
        .toEqual(expect.not.stringContaining(MAIL_LINK));
      expect(output)
        .toEqual(expect.not.stringContaining(PHONE_LINK));
    });
  });

  describe('when type is "string" as part of an array', function () {
    it('should render uri format if format==uri', function () {
      FIXTURE_METADATA_OBJECT.format = 'uri';
      const output = JSON.stringify(FormattedMetadataItem(FIXTURE_METADATA_OBJECT, FIXTURE_VALUE));
      expect(output)
        .toEqual(expect.stringContaining(REGULAR_LINK));
      expect(output)
        .toEqual(expect.stringContaining(TARGET_BLANK));
      expect(output)
        .toEqual(expect.not.stringContaining(MAIL_LINK));
      expect(output)
        .toEqual(expect.not.stringContaining(PHONE_LINK));
    });

    it('should render email format if format==email', function () {
      FIXTURE_METADATA_OBJECT.format = 'email';
      const output = JSON.stringify(FormattedMetadataItem(FIXTURE_METADATA_OBJECT, FIXTURE_VALUE));
      expect(output)
        .toEqual(expect.stringContaining(REGULAR_LINK));
      expect(output)
        .toEqual(expect.stringContaining(MAIL_LINK));
      expect(output)
        .toEqual(expect.not.stringContaining(TARGET_BLANK));
    });

    it('should render phone format if format==phoneNumber', function () {
      FIXTURE_METADATA_OBJECT.format = 'phoneNumber';
      const output = JSON.stringify(FormattedMetadataItem(FIXTURE_METADATA_OBJECT, FIXTURE_VALUE));
      expect(output)
        .toEqual(expect.stringContaining(REGULAR_LINK));
      expect(output)
        .toEqual(expect.stringContaining(PHONE_LINK));
      expect(output)
        .toEqual(expect.not.stringContaining(TARGET_BLANK));
    });

    it('should render no format if format==wrong', function () {
      FIXTURE_METADATA_OBJECT.format = 'otherFormat';
      const output = JSON.stringify(FormattedMetadataItem(FIXTURE_METADATA_OBJECT, FIXTURE_VALUE));
      expect(output)
        .toEqual(expect.not.stringContaining(REGULAR_LINK));
      expect(output)
        .toEqual(expect.not.stringContaining(TARGET_BLANK));
    });
  });

  describe('when type is not string', function () {
    it('should render no format', function () {
      FIXTURE_METADATA_OBJECT.type = 'noString';
      FIXTURE_METADATA_OBJECT.format = 'uri';
      const output = JSON.stringify(FormattedMetadataItem(FIXTURE_METADATA_OBJECT, FIXTURE_VALUE));
      expect(output)
        .toEqual(expect.not.stringContaining(REGULAR_LINK));
      expect(output)
        .toEqual(expect.not.stringContaining(TARGET_BLANK));
    });
  });
});
