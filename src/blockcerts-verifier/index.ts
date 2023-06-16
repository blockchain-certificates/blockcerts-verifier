import 'whatwg-fetch';
import '../polyfills/Uint8Array.fill';
import { BlockcertsVerifierContainer as BlockcertsVerifier } from './BlockcertsVerifierContainer';

window.customElements.define('blockcerts-verifier', BlockcertsVerifier);
