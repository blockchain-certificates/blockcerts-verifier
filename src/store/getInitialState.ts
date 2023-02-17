import * as DISPLAY_MODE from '../constants/displayMode';
import { Certificate, IVerificationMapItem, VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';
import { ExplorerAPI } from '@blockcerts/explorer-lookup';
import { Theme } from '../constants/theme';

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
  theme: Theme;
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
    theme: Theme.BRIGHT,
    ...apiConfiguration
  };
}
