import * as DISPLAY_MODE from '../constants/displayMode';
import { THEME } from '../constants/theme';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';
import type { Certificate, IVerificationMapItem } from '@blockcerts/cert-verifier-js';
import type { ExplorerAPI } from '@blockcerts/explorer-lookup';

export interface IFinalStep {
  description: string;
  label: string;
  linkText?: string;
}

export interface BlockcertsVerifierState {
  isGeneratingPDF?: boolean;
  certificateDefinition?: Certificate;
  input: any; // TODO: verify and define what is in input
  verifiedSteps: IVerificationMapItem[]; // TODO: verify this matches the CVJS definition
  finalStep: IFinalStep; // TODO: verify this matches this definition
  verificationStatus: VERIFICATION_STATUSES;
  showVerificationModal: boolean;
  displayMode: string; // TODO: define enum
  disableDownloadPdf: boolean;
  theme: THEME;
  src?: string;
  disableAutoVerify?: boolean;
  disableVerify?: boolean;
  allowDownload?: boolean;
  allowSocialShare?: boolean;
  showMetadata?: boolean;
  clickableUrls?: boolean;
  locale?: string;
  explorerAPIs?: ExplorerAPI[];
  didResolverUrl?: string;
  errorMessage?: string;
}

export default function getInitialState (apiConfiguration = {}): BlockcertsVerifierState {
  return {
    input: {},
    verifiedSteps: [],
    finalStep: null,
    verificationStatus: VERIFICATION_STATUSES.DEFAULT,
    showVerificationModal: false,
    displayMode: DISPLAY_MODE.CARD,
    disableDownloadPdf: false,
    theme: THEME.BRIGHT,
    ...apiConfiguration
  };
}
