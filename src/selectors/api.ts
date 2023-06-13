import { ExplorerAPI } from '@blockcerts/explorer-lookup';
import type { BlockcertsVerifierState } from '../store/getInitialState';
import type { THEME } from '../constants/theme';

export function getDisableAutoVerify (state: BlockcertsVerifierState): boolean {
  return state.disableAutoVerify;
}

export function getDisableVerify (state: BlockcertsVerifierState): boolean {
  return state.disableVerify;
}

export function getAllowDownload (state: BlockcertsVerifierState): boolean {
  return state.allowDownload;
}

export function getDisableDownloadPdf (state: BlockcertsVerifierState): boolean {
  return state.disableDownloadPdf;
}

export function getAllowSocialShare (state: BlockcertsVerifierState): boolean {
  return state.allowSocialShare;
}

export function getShowMetadata (state: BlockcertsVerifierState): boolean {
  return state.showMetadata;
}

export function getDisplayMode (state: BlockcertsVerifierState): string {
  return state.displayMode;
}

export function getTheme (state: BlockcertsVerifierState): THEME {
  return state.theme;
}

export function getLocale (state: BlockcertsVerifierState): string {
  return state.locale;
}

export function getExplorerAPIs (state: BlockcertsVerifierState): ExplorerAPI[] {
  return state.explorerAPIs;
}

export function getClickableUrls (state: BlockcertsVerifierState): boolean {
  return state.clickableUrls;
}

export function getDidResolverUrl (state: BlockcertsVerifierState): string {
  return state.didResolverUrl;
}
