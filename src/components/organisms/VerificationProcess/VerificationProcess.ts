import { html, LitElement } from '@polymer/lit-element';
import VerificationStep from '../../molecules/VerificationStep';
import '../../atoms/FinalVerificationStep';
import '../SubstepsList';
import CSS from './_components.verification-process-css';
import getText from '../../../i18n/getText';
import { VERIFICATION_STATUSES } from '@blockcerts/cert-verifier-js';
import type { TemplateResult } from 'lit-html';

class VerificationProcess extends LitElement {
  private listElement: Element;

  static get properties (): any {
    // if the interface is defined properly with typescript, then the boolean values do not get updated.
    return {
      steps: [],
      transactionLink: String,
      hasError: Boolean,
      isTestChain: Boolean
    };
  }

  verificationInProgressTemplate (): TemplateResult {
    return html`
        <span class='buv-u-visually-hidden'>${getText('text.verificationStepProgress')}</span>
        <svg width='20' height='7' viewBox='0 0 120 30' xmlns='http://www.w3.org/2000/svg'><circle cx='15' cy='15' r='15'><animate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite'/><animate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite'/></circle><circle cx='60' cy='15' r='9' fill-opacity=''.9'><animate attributeName='r' from='9' to='9' begin='0s' dur='0.8s' values='9;15;9' calcMode='linear' repeatCount='indefinite'/><animate attributeName='fill-opacity' from=''.5' to='.5' begin='0s' dur='0.8s' values='.5;1;.5' calcMode='linear' repeatCount='indefinite'/></circle><circle cx='105' cy='15' r='15'><animate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite'/><animate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite'/></circle></svg>
    `;
  }

  _didRender (): void {
    if (!this.listElement) {
      this.listElement = this.shadowRoot.querySelectorAll('.buv-js-verification-process__step-list')[0];
    }
  }

  _render ({ steps, transactionLink, hasError, isTestChain }): TemplateResult {
    const innerHTML = steps
      .filter(step => step.status !== VERIFICATION_STATUSES.DEFAULT)
      .map((step, i) => html`
        ${VerificationStep({
          ...step,
          isParent: true,
          isFirst: i === 0,
          isTestChain
        })}
        ${step.status === VERIFICATION_STATUSES.STARTING
          ? html`${this.verificationInProgressTemplate()}`
          : html`<buv-substeps-list subSteps='${step.subSteps}' suites='${step.suites}' hasError?='${hasError}'></buv-substeps-list>`
        }
    `);

    // TODO: better handle this dynamic class (cf npm classnames)
    const progressBarClasses = [
      'buv-c-verification-progress-bar__tube',
      'buv-qa-verification-progress-bar__tube',
      hasError ? 'has-errored' : '',
      isTestChain ? 'is-test' : '',
      innerHTML.length ? 'has-started' : ''
    ].join(' ');

    let maxHeight = `${this.listElement ? this.listElement.getBoundingClientRect().height : 0}px`;

    const allStepsAreRendered = steps.every(step => step.status === VERIFICATION_STATUSES.SUCCESS) ||
      steps.some(step => step.status === VERIFICATION_STATUSES.FAILURE);
    if (allStepsAreRendered) {
      maxHeight = '100%';
    }

    return html`
    ${CSS}
    <section class='buv-c-verification-process'>
      <div class='buv-c-verification-progress-bar' >
        <div class$='${progressBarClasses}' style$='max-height: ${maxHeight}'></div>
      </div>  
      <dl class='buv-c-verification-process__step-list  buv-js-verification-process__step-list'>
        ${innerHTML}
        <buv-final-verification-step isVisible='${allStepsAreRendered && !hasError}'></buv-final-verification-step>
      </dl>
    </section>
  `;
  }
}

window.customElements.define('buv-verification-process-raw', VerificationProcess);

// wrap VerificationProcess in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function VerificationProcessWrapper ({ steps, transactionLink, hasError, isTestChain }): TemplateResult {
  return html`<buv-verification-process-raw
    steps='${steps}'
    hasError?='${hasError}'
    isTestChain?='${isTestChain}'
    style='max-width: 100%;'
    ></buv-verification-process-raw>`;
}

export default VerificationProcessWrapper;
