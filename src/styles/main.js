import {html} from '@polymer/lit-element';
export default html`<style>/*
  following ITCSS
  https://github.com/sky-uk/css
  https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/
*/
/* components */
.buv-c-input {
  font-size: 15px;
  color: #031532;
  border-radius: 2px;
  padding: 12px 15px;
  background-color: #f3f4f5;
  border: solid 1px rgba(3, 21, 50, 0.13);
  box-sizing: border-box;
  width: 100%; }

.buv-c-input::-moz-placeholder {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  color: rgba(3, 21, 50, 0.3);
  letter-spacing: -.25px; }

.buv-c-input::-webkit-input-placeholder {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  color: rgba(3, 21, 50, 0.3);
  letter-spacing: -.25px; }

.buv-c-input:-moz-placeholder {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  color: rgba(3, 21, 50, 0.3);
  letter-spacing: -.25px; }

.buv-c-input:-ms-input-placeholder {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  color: rgba(3, 21, 50, 0.3);
  letter-spacing: -.25px; }

.buv-u-visually-hidden {
  position: absolute !important;
  clip: rect(1px 1px 1px 1px);
  /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0 !important;
  border: 0 !important;
  height: 1px !important;
  width: 1px !important;
  overflow: hidden; }
</style>`;
