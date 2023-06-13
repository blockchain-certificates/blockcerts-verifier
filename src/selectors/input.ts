import type { BlockcertsVerifierState } from '../store/getInitialState';

export function getCertificateUrl (state: BlockcertsVerifierState): string {
  return state.input.certificateUrl;
}

export function getUrlIsValid (state: BlockcertsVerifierState): boolean {
  if (typeof state.input.isValid === 'undefined') {
    return true;
  }
  return state.input.isValid;
}
