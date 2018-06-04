import { html, LitElement } from '@polymer/lit-element';



class BlockcertsUniversalVerifier extends LitElement {
  _render () {
    return html`
       <style>
         .buv-c-input {
            font-size: 15px;
           color: rgba(3, 21, 50, 1);
           border-radius: 2px;
           padding: 12px 15px;
           background-color: rgba(243, 244, 245, 6);
           border: solid 1px rgba(3, 21, 50, .13);
           box-sizing: border-box;
           width: 100%;
         }
         .buv-c-input::-moz-placeholder{
           font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
           color: rgba(3, 21, 50, .3);
           letter-spacing: -.25px;
         }
         .buv-c-input::-webkit-input-placeholder {
           font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
           color: rgba(3, 21, 50, .3);
           letter-spacing: -.25px;
         }
         .buv-c-input:-moz-placeholder {
           font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
           color: rgba(3, 21, 50, .3);
           letter-spacing: -.25px;
         }
         .buv-c-input:-ms-input-placeholder {
           font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
           color: rgba(3, 21, 50, .3);
           letter-spacing: -.25px;
         }
         
         .buv-u-visually-hidden {
           position: absolute !important;
           clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
           clip: rect(1px, 1px, 1px, 1px);
           padding:0 !important;
           border:0 !important;
           height: 1px !important; 
           width: 1px !important; 
           overflow: hidden;
         }
       </style>
       <h1>Blockcerts Universal Verifier</h1>
       <label 
         for='certificate-json-url'
         class='buv-u-visually-hidden'>Enter the certificate URL</label>
       <input 
         type='text'
         id='certificate-json-url'
         placeholder='Credential URL'
         class='buv-c-input'
       />
    `
  }
}

window.customElements.define('blockcerts-universal-verifier', BlockcertsUniversalVerifier);
