import { html, LitElement } from '@polymer/lit-element';
import VerificationStep from '../../molecules/VerificationStep';
import '../../atoms/FinalVerificationStep';
import '../SubstepsList';
import CSS from './_components.verification-process-css';
import VERIFICATION_STATUS from '../../../constants/verificationStatus';

class VerificationProcess extends LitElement {
  static get properties () {
    return {
      steps: [],
      transactionLink: String,
      chain: String,
      hasError: Boolean,
      isTestChain: Boolean
    };
  }

  verificationInProgressTemplate () {
    return html`
        <span class='buv-u-visually-hidden'>Verifying step...</span>
        <svg width='20' height='7' viewBox='0 0 120 30' xmlns='http://www.w3.org/2000/svg'><circle cx='15' cy='15' r='15'><animate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite'/><animate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite'/></circle><circle cx='60' cy='15' r='9' fill-opacity=''.9'><animate attributeName='r' from='9' to='9' begin='0s' dur='0.8s' values='9;15;9' calcMode='linear' repeatCount='indefinite'/><animate attributeName='fill-opacity' from=''.5' to='.5' begin='0s' dur='0.8s' values='.5;1;.5' calcMode='linear' repeatCount='indefinite'/></circle><circle cx='105' cy='15' r='15'><animate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite'/><animate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite'/></circle></svg>
    `;
  }

  _didRender () {
    if (!this.listElement) {
      this.listElement = this.shadowRoot.querySelectorAll('.buv-js-verification-process__step-list')[0];
    }
  }

  _render ({ steps, transactionLink, chain, hasError, isTestChain }) {
    const innerHTML = steps
      .filter(step => step.status !== VERIFICATION_STATUS.DEFAULT)
      .map((step, i) => html`
      ${VerificationStep({
    ...step,
    isParent: true,
    isFirst: i === 0,
    isTestChain
  })}
      ${step.status === VERIFICATION_STATUS.STARTED
    ? html`${this.verificationInProgressTemplate()}`
    : html`<buv-substeps-list subSteps='${step.subSteps}' hasError?='${hasError}'></buv-substeps-list>`
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

    const allStepsAreRendered = steps.every(step => step.status === VERIFICATION_STATUS.SUCCESS) ||
      steps.some(step => step.status === VERIFICATION_STATUS.FAILURE);
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
        <buv-final-verification-step 
          transactionLink='${transactionLink}'
          chain='${chain}'
          isTestChain='${isTestChain}'
          isVisible='${allStepsAreRendered && !hasError}'
        ></buv-final-verification-step>
      </dl>
    </section>
  `;
  }
}

window.customElements.define('buv-verification-process-raw', VerificationProcess);

// wrap VerificationProcess in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function VerificationProcessWrapper ({ steps, transactionLink, chain, hasError, isTestChain }) {
  return html`<buv-verification-process-raw
    steps='${steps}'
    transactionLink='${transactionLink}'
    chain='${chain}'
    hasError?='${hasError}'
    isTestChain?='${isTestChain}'
    style='max-width: 100%;'
    ></buv-verification-process-raw>`;
}

export default VerificationProcessWrapper;
