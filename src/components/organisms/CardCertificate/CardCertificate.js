import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.card-css';
import '../../molecules/VerifyButton';

class CardCertificate extends LitElement {
  constructor () {
    super();
    this.logoHasError = false;
    this.onImageLoadError = this.onImageLoadError.bind(this);
  }

  static get properties () {
    return {
      hasCertificateDefinition: Boolean,
      recipientName: String,
      certificateTitle: String,
      issuedOn: String,
      issueDate: String,
      issuerName: String,
      issuerLogo: String,
      recordLink: String,
      hideRecordLink: Boolean,
      hideVerifyButton: Boolean,
      logoHasError: Boolean
    };
  }

  onImageLoadError () {
    this.logoHasError = true;
  }

  organizationName (props) {
    return html`<p class='buv-o-text-15'>${props.issuerName}</p>`;
  }

  organizationLogo (props) {
    return html`<img src='${props.issuerLogo}' alt='${props.issuerName}' onerror='${this.onImageLoadError}' class='buv-c-card__img'/>`;
  }

  _render (props) {
    const {
      hasCertificateDefinition,
      recipientName,
      certificateTitle,
      issuedOn,
      issueDate,
      issuerName,
      recordLink,
      hideRecordLink,
      hideVerifyButton } = props;

    if (!hasCertificateDefinition) {
      return null;
    }

    const titleClass = [
      'buv-c-card__title',
      hideRecordLink ? 'buv-c-card__title--no-padding' : ''
    ].join(' ');

    return html`
      ${CSS}
      <section class='buv-c-card'>
        <div class='buv-c-card__img-wrapper'>
          ${!this.logoHasError ? this.organizationLogo(props) : this.organizationName(props)}
        </div>
        <div class='buv-c-card__title-wrapper'>
          <h1 class$=${titleClass}>${certificateTitle}</h1>
          <h2 class$='${titleClass}  buv-c-card__recipient'>${recipientName}</h2>
          <span class='buv-o-text-12'>Issued on <time datetime$='${issuedOn}'>${issueDate}</time> by ${issuerName}</span>
        </div>
      ${
  hideRecordLink
    ? ''
    : html`<a class='buv-o-text-12  buv-o-link  buv-c-card__record-link' href='${recordLink}' target='_blank'>
    <span class='buv-o-link__text--underline'>View Record</span>
    </a>`
}
      </section>
      ${hideVerifyButton
    ? ''
    : html`<buv-verify-button isHollow class='buv-c-card__verify-button'></buv-verify-button>`
}
    `;
  }
}

window.customElements.define('buv-card-certificate-raw', CardCertificate);

// wrap CardCertificate in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function CardCertificateWrapper (props) {
  return html`
  <buv-card-certificate-raw
    hasCertificateDefinition='${props.hasCertificateDefinition}'
    recipientName='${props.recipientName}'
    certificateTitle='${props.certificateTitle}'
    issuedOn='${props.issuedOn}'
    issueDate='${props.issueDate}'
    issuerName='${props.issuerName}'
    issuerLogo='${props.issuerLogo}'
    recordLink='${props.recordLink}'
    hideRecordLink='${props.hideRecordLink}'
    hideVerifyButton='${props.hideVerifyButton}'
  ></buv-card-certificate-raw>`;
}

export default CardCertificateWrapper;
