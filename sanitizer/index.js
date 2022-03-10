import xss from 'xss';
import cssfilter from 'cssfilter';

function isBase64 (value) {
  const test = /^data:.+;base64,/;
  return !!value.match(test);
}

function getBase64Data (value) {
  const data = value.split('base64,')[1];
  return data;
}

const whiteListedCssProperties = {
  ...cssfilter.getDefaultWhiteList(),
  bottom: true,
  left: true,
  float: true,
  overflow: true,
  position: true,
  right: true,
  top: true,
  transform: true,
  opacity: true,
  'transform-origin': true,
  'flex-direction': true,
  'flex-wrap': true,
  'justify-content': true,
  'align-items': true,
  'white-space': true,
  'line-height': true,
  'grid-template-columns': true,
  'grid-template-rows': true,
  'grid-column': true,
  'grid-row': true,
  'grid-area': true,
  'align-self': true,
  'justify-self': true,
  span: true
};

function modifyWhiteList () {
  const whiteList = xss.getDefaultWhiteList();
  Object.keys(whiteList).forEach(el => {
    whiteList[el].push('style');
    whiteList[el].push('class');
    whiteList[el].push('download');
  });
  return whiteList;
}

function handleTagAttr (tag, name, value, isWhiteAttr) {
  if (name === 'style') {
    return `${name}="${cssfilter(value, {
      whiteList: whiteListedCssProperties
    }).replace(/; /g, ';')}"`;
  }

  if (tag === 'img' && name === 'src') {
    if (isBase64(value)) {
      const data = getBase64Data(value);
      try {
        atob(data);
        return `${name}="${value}"`;
      } catch (e) {
        return name;
      }
    }
  }
}

function handleAttrValue (tag, name, value, cssFilter) {
  // unescape attribute value firstly
  value = xss.friendlyAttrValue(value);

  if (name === 'href' || name === 'src') {
    // filter `href` and `src` attribute
    // only allow the value that starts with `http://` | `https://` | `mailto:` | `data:` | `/` | `#`
    value = utilTrim(value);
    if (value === '#') return '#';
    if (!isWhiteListedHref(value)) {
      return '';
    }
  } else if (name === 'background') {
    // filter `background` attribute (maybe no use)
    // `javascript:`
    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
      return '';
    }
  } else if (name === 'style') {
    // `expression()`
    REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
      return '';
    }
    // `url()`
    REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
      REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
      if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
        return '';
      }
    }
    if (cssFilter !== false) {
      cssFilter = cssFilter || xss.getDefaultCSSWhiteList();
      value = cssFilter.process(value);
    }
  }

  // escape `<>"` before returns
  value = xss.escapeAttrValue(value);
  return value;
}

function isWhiteListedHref (value) {
  const whiteList = ['http://', 'https://', 'mailto:', 'tel:', 'data:', '#', '/'];
  return whiteList.some(item => value.substr(0, item.length) === item);
}

// utility trim from xss
function utilTrim (str) {
  if (String.prototype.trim) {
    return str.trim();
  }
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

// RegExp list from xss
var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_7 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;

const options = {
  whiteList: modifyWhiteList(),
  css: false,
  stripIgnoreTagBody: true,
  onTagAttr: handleTagAttr,
  safeAttrValue: handleAttrValue
};
const sanitizer = new xss.FilterXSS(options);

export default function sanitize (html) {
  return sanitizer.process(html);
}
