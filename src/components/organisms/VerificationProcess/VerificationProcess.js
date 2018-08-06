import { html, LitElement } from '@polymer/lit-element';
import VerificationStep from '../../molecules/VerificationStep';
import FinalVerificationStep from '../../atoms/FinalVerificationStep';
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
    ? '...'
    : html`<buv-substeps-list subSteps='${step.subSteps}' hasError?='${hasError}'></buv-substeps-list>`
}
       ${step.isLast && step.status === VERIFICATION_STATUS.SUCCESS
    ? FinalVerificationStep({ transactionLink, chain, isTestChain })
    : ''
}
    `);

    const allStepsAreRendered = steps.every(step => step.status === VERIFICATION_STATUS.SUCCESS || step.status === VERIFICATION_STATUS.FAILURE);

    // TODO: better handle this dynamic class (cf npm classnames)
    const progressBarClasses = [
      'buv-c-verification-progress-bar__tube',
      hasError ? 'has-errored' : '',
      isTestChain ? 'is-test' : '',
      innerHTML.length ? 'has-started' : ''
    ].join(' ');

    let maxHeight = `${this.listElement ? this.listElement.getBoundingClientRect().height : 0}px`;
    if (allStepsAreRendered) {
      maxHeight = '100%';
    }

    return html`
    ${CSS}
    <section class='buv-c-verification-process'>
      <div class='buv-c-verification-progress-bar' >
        <div class$='${progressBarClasses}' style='max-height: ${maxHeight}'></div>
      </div>  
      <dl class='buv-c-verification-process__step-list  buv-js-verification-process__step-list'>
        ${innerHTML}
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
    ></buv-verification-process-raw>`;
}

export default VerificationProcessWrapper;
