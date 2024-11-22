import { html, LitElement } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import CSS from './_components.verifiable-presentation-css';
import { getV3DisplayHtml } from '../../../selectors/certificate';
import type { TemplateResult } from 'lit-html';

export interface IVerifiablePresentationApi {
  verifiableCredentials: any[];
}

class VerifiablePresentation extends LitElement {
  static get properties (): IVerifiablePresentationApi {
    // if the interface is defined properly with typescript, then the boolean values do not get updated.
    return {
      verifiableCredentials: Array as any
    };
  }

  constructor () {
    super();
    this.scrollCredentialIntoView = this.scrollCredentialIntoView.bind(this);
  }

  scrollCredentialIntoView (id: string): void {
    const element = this.shadowRoot.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }

  _render ({ verifiableCredentials }): TemplateResult {
    return html`
      ${CSS}
      <ul>
        ${verifiableCredentials.map((credential, i) => html`
          <li class="buv-c-verifiable-presentation-navigation"><a onclick="${() => { this.scrollCredentialIntoView(credential.id); }}">Credential ${i + 1}</a></li>
        `)}
      </ul>
      <div class="slider">
        <ul class="buv-c-verifiable-presentation">
          ${verifiableCredentials.map((credential) => html`
            <li id$="${credential.id}" class="buv-c-verifiable-presentation__credential">${unsafeHTML(getV3DisplayHtml(credential))}</li>
          `)}
        </ul>
      </div>
    `;
  }
}

window.customElements.define('buv-verifiable-presentation-raw', VerifiablePresentation);

function VerifiablePresentationWrapper (props: IVerifiablePresentationApi): TemplateResult {
  return html`
    <buv-verifiable-presentation-raw verifiableCredentials="${props.verifiableCredentials}"></buv-verifiable-presentation-raw>
  `;
}

export {
  VerifiablePresentationWrapper as VerifiablePresentation
};
