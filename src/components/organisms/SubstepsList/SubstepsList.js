import { html, LitElement } from '@polymer/lit-element';
import VerificationStep from '../../molecules/VerificationStep/index';

class SubStepsList extends LitElement {
  constructor () {
    super ();
    this.isOpen = false;
    this.toggleOpen = this.toggleOpen.bind(this);
  }
  static get properties () {
    return {
      subSteps: [],
      isOpen: Boolean
    }
  }

  toggleOpen () {
    this.isOpen = !this.isOpen;
  }

  showList (subSteps) {
    return html`${ subSteps.map(subStep => html`${VerificationStep(subStep)}`) }`;
  }

  _render (props) {
    return html`
    <a title='Toggle open list of substeps' onclick='${this.toggleOpen}'>
      ${this.isOpen ? 'hide' : `${props.subSteps.length} items`}
    </a>
    ${this.isOpen ? this.showList(props.subSteps) : null}
    `;
  }
}

export default SubStepsList
