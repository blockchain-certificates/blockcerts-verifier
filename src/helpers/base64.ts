import { BlockcertsV3Display } from '@blockcerts/cert-verifier-js';

const toBase64 = (textContent: string): string => {
  return window.btoa(textContent);
};

export function getBase64String (display: BlockcertsV3Display): string {
  return `data:${display.contentMediaType};${display.contentEncoding},${display.content}`;
}

export default toBase64;
