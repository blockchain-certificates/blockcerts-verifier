import { html, LitElement } from '@polymer/lit-element';
import VerificationStep from '../../molecules/VerificationStep/index';

class SubStepsList extends LitElement {
  static get properties () {
    return {
      subSteps: []
    }
  }

  _render (props) {
    console.log(props);
    return html`
    ${props.subSteps
      .filter(subStep => !!subStep.status)
      .map(subStep => html`${VerificationStep(subStep)}`)
    }
    `;
  }
}

export default SubStepsList
