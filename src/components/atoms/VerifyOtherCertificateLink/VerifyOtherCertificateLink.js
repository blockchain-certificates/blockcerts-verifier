import { html } from '@polymer/lit-element';
import CSS from './_components.verify-other-certificate-css';

export default function VerifyOtherCertificateLink ({ onClick = () => {}, isVisible = false } = {}) {
  if (!isVisible) {
    return null;
  }

  return html`
    ${CSS}
    <a onclick='${onClick}' class='buv-o-text-12  buv-o-link  buv-c-verify-other-certificate  buv-qa-verify-other-certificate'>
      <span class='buv-o-link__text--underline'>Vérifier un autre enregistrement</span>
    </a>
  `;
}
