import xss from 'xss';
import cssfilter from 'cssfilter';

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
