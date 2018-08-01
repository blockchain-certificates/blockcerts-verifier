import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.substeps-list-css';
import VerificationStep from '../../molecules/VerificationStep';

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
    const itemsLength = props.subSteps.length;
    const itemString = `${itemsLength} Item${itemsLength > 1 ? 's' : ''}`;
    return html`
    ${CSS}
    <a title='Toggle open list of substeps' onclick='${this.toggleOpen}' class='buv-o-small-text  buv-o-link'>
      ${this.isOpen ? 'Hide' : itemString}
    </a>
    ${this.isOpen ? this.showList(props.subSteps) : null}
    `;
  }
}

export default SubStepsList
