import { html, LitElement} from '@polymer/lit-element';
import VerificationStep from '../../molecules/VerificationStep';
import FinalVerificationStep from '../../atoms/FinalVerificationStep';
import '../SubstepsList';
import CSS from './_components.verification-process-css';

class VerificationProcess extends LitElement {
  static get properties () {
    return {
      steps: Object,
      transactionLink: String,
      chain: String,
      hasError: Boolean,
      isTestChain: Boolean
    }
  }

  _render({ steps, transactionLink, chain, hasError, isTestChain }) {
    const innerHTML = steps
      .map((step, i) => html`
      ${VerificationStep({
        ...step,
        isParent: true,
        isFirst: i === 0,
        isTestChain
      })}
      <buv-substeps-list subSteps='${step.subSteps}'></buv-substeps-list>
    `);

    // TODO: better handle this dynamic class (cf npm classnames)
    const progressBarClasses = [
      'buv-c-verification-progress-bar',
      hasError ? 'has-errored' : '',
      isTestChain ? 'is-test' : ''
    ].join(' ');

    if (!innerHTML.length) {
      return;
    }

    return html`
    ${CSS}
    <section class='buv-c-verification-process'>
      <div class$='${progressBarClasses}'></div>  
      <dl class='buv-c-verification-process__step-list'>
        ${innerHTML}
        ${FinalVerificationStep({ hasError, transactionLink, chain, isTestChain })}
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
    ></buv-verification-process-raw>`
}

export default VerificationProcessWrapper;
