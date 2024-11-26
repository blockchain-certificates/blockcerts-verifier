import { html, LitElement } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import CSS from './_components.verifiable-presentation-css';
import { getV3DisplayHtml, getVerificationStatusForCredential } from '../../../selectors/certificate';
import type { TemplateResult } from 'lit-html';
import '../../atoms/FinalVerificationStep';

export interface IVerifiablePresentationApi {
  verifiableCredentials: any[];
}

class VerifiablePresentation extends LitElement {
  private vcNavigationElements: NodeListOf<Element>;

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
    this.activateLink(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }

  activateLink (id: string): void {
    this.vcNavigationElements.forEach((element) => {
      element.classList.remove('is-active');
    });
    const link = this.shadowRoot.querySelector(`[data-target="${id}"]`);
    link.classList.add('is-active');
  }

  _firstRendered () {
    this.vcNavigationElements = this.shadowRoot.querySelectorAll('.js-verifiable-presentation-navigation');
  }

  _render ({ verifiableCredentials }): TemplateResult {
    return html`
      ${CSS}
      <ul>
        ${verifiableCredentials.map((credential, i) => {
          const linkClasslist = [
            'js-verifiable-presentation-navigation',
            'buv-c-verifiable-presentation-navigation__link',
            i === 0 ? 'is-active' : ''
          ].join(' ');
          return html`
            <li class="buv-c-verifiable-presentation-navigation">
              <a 
                class$="${linkClasslist}"
                data-target$="${credential.id}"
                onclick="${() => { this.scrollCredentialIntoView(credential.id); }}">
                  Credential ${i + 1}
              </a>
            </li>
          `;
        })}
      </ul>
      <div class="slider">
        <ul class="buv-c-verifiable-presentation">
          ${verifiableCredentials.map((credential) => html`
            <li id$="${credential.id}" class="buv-c-verifiable-presentation__credential">
                ${unsafeHTML(getV3DisplayHtml(credential))}
                <buv-final-verification-step 
                  finalStep="${getVerificationStatusForCredential(credential)?.message}"
                  status="${getVerificationStatusForCredential(credential)?.status}"
                  isVisible 
                  standalone
                  isOverlay
                >
                </buv-final-verification-step>
            </li>
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
