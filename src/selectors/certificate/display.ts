import type { Certificate, BlockcertsV3Display, CONTENT_MEDIA_TYPES } from '@blockcerts/cert-verifier-js';

export function getDisplay (certificateDefinition: Certificate): BlockcertsV3Display {
  return certificateDefinition.display;
}

export function getDisplayContent (display: BlockcertsV3Display): string {
  return display?.content ?? '';
}

export function getDisplayContentMediaType (display: BlockcertsV3Display): CONTENT_MEDIA_TYPES {
  return display?.contentMediaType;
}

export function getDisplayContentEncoding (display: BlockcertsV3Display): string {
  return display?.contentEncoding ?? '';
}
