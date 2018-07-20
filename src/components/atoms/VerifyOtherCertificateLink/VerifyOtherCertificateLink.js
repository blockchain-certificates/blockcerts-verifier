import { html } from '@polymer/lit-element';
import CSS from './_components.verify-other-certificate-css';

export default function VerifyOtherCertificateLink ({ onClick = () => {}, isVisible = false } = {}) {
  if (!isVisible) {
    return null;
  }

  return html`
    ${CSS}
    <a onclick='${onClick}' class='buv-o-small-text  buv-o-link'>Verify another record</a>
  `;
}
