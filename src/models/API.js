import { snakeToCamelCase } from '../helpers/toCamelCase';
import * as THEME from '../constants/theme';

const APIKeys = {
  'src': String,
  'certificate': String,
  'disable-auto-verify': Boolean,
  'disable-verify': Boolean,
  'disable-other-verification': Boolean,
  'allow-download': Boolean,
  'allow-social-share': Boolean,
  'display-mode': String,
  'show-metadata': Boolean,
  'theme': THEME.DARK | THEME.BRIGHT
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
