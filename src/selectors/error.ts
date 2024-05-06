import type { BlockcertsVerifierState } from '../store/getInitialState';

export function getErrorMessage (state: BlockcertsVerifierState): string {
  return state.errorMessage;
}
export function getAdditionalErrorInfo (state: BlockcertsVerifierState): string {
  return state.additionalErrorInfo;
}
