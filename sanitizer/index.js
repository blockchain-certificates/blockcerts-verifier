import xss from 'xss';
import cssfilter from 'cssfilter';

function isBase64 (value) {
  const test = /^data:image.+;base64,/;
  return !!value.match(test);
}

function getBase64Data (value) {
  const data = value.split('base64,')[1];
  return data;
}

function modifyWhiteList () {
  const whiteList = xss.getDefaultWhiteList();
  Object.keys(whiteList).forEach(el => {
    whiteList[el].push('style');
    whiteList[el].push('class');
  });

  return whiteList;
}

function handleTagAttr (tag, name, value, isWhiteAttr) {
  if (name === 'style') {
    return `${name}="${cssfilter(value).replace(/; /g, ';')}"`;
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

const options = {
  whiteList: modifyWhiteList(),
  css: false,
  stripIgnoreTagBody: true,
  onTagAttr: handleTagAttr
};
const sanitizer = new xss.FilterXSS(options);

export default function sanitize (html) {
  return sanitizer.process(html);
}
