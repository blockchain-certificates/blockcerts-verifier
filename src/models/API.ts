import { snakeToCamelCase } from '../helpers/toCamelCase';
import { THEME } from '../constants/theme';
import type { ExplorerAPI } from '@blockcerts/explorer-lookup';
import type { IBlockcertsVerifierProps } from '../blockcerts-verifier/BlockcertsVerifier';

export interface IBlockcertsVerifierAPI {
  src?: string;
  'disable-auto-verify'?: boolean;
  'disable-verify'?: boolean;
  'allow-download'?: boolean;
  'disable-download-pdf'?: boolean;
  'allow-social-share'?: boolean;
  'display-mode'?: string;
  'show-metadata'?: boolean;
  'clickable-urls'?: boolean;
  theme?: THEME;
  locale?: string;
  explorerAPIs?: ExplorerAPI[];
  'did-resolver-url'?: string;
}

const APIKeys: IBlockcertsVerifierAPI = {
  src: String as any,
  'disable-auto-verify': Boolean as any,
  'disable-verify': Boolean as any,
  'allow-download': Boolean as any,
  'disable-download-pdf': Boolean as any,
  'allow-social-share': Boolean as any,
  'display-mode': String as any,
  'show-metadata': Boolean as any,
  'clickable-urls': Boolean as any,
  theme: THEME as any,
  locale: String as any,
  explorerAPIs: {} as any,
  'did-resolver-url': String as any
};

const APICamelCase = Object.keys(APIKeys)
  .map(snakeToCamelCase)
  .reduce((acc, key) => {
    acc[key] = APIKeys[key];
    return acc;
  }, {});

function getAPIOptions (options: IBlockcertsVerifierProps): IBlockcertsVerifierProps {
  return Object.keys(APICamelCase)
    .reduce((acc, key) => {
      if (options[key]) {
        acc[key] = options[key];
      }
      return acc;
    }, {});
}

export { APIKeys, APICamelCase, getAPIOptions };
