import { snakeToCamelCase } from '../helpers/toCamelCase';
import * as THEME from '../constants/theme';

const APIKeys = {
  src: String,
  'disable-auto-verify': Boolean,
  'disable-verify': Boolean,
  'allow-download': Boolean,
  'disable-download-pdf': Boolean,
  'allow-social-share': Boolean,
  'display-mode': String,
  'show-metadata': Boolean,
  'clickable-urls': Boolean,
  theme: THEME.DARK | THEME.BRIGHT,
  locale: String,
  explorerAPIs: {},
  'did-resolver-url': String
};

const APICamelCase = Object.keys(APIKeys)
  .map(snakeToCamelCase)
  .reduce((acc, key) => {
    acc[key] = APIKeys[key];
    return acc;
  }, {});

function getAPIOptions (options) {
  return Object.keys(APICamelCase)
    .reduce((acc, key) => {
      if (options[key]) {
        acc[key] = options[key];
      }
      return acc;
    }, {});
}

export { APIKeys, APICamelCase, getAPIOptions };
