import { snakeToCamelCase } from '../helpers/toCamelCase';

const APIKeys = {
  'src': String,
  'disable-auto-verify': Boolean,
  'disable-verify': Boolean
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
