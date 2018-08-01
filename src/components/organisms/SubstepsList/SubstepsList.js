import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.substeps-list-css';
import VerificationStep from '../../molecules/VerificationStep';

class SubStepsList extends LitElement {
  constructor () {
    super();
    this.isOpen = false;
    this.toggleOpen = this.toggleOpen.bind(this);
  }
  static get properties () {
    return {
      subSteps: [],
      isOpen: Boolean
    };
  }

  toggleOpen () {
    this.isOpen = !this.isOpen;
  }

  showList (subSteps) {
    return html`${subSteps.map(subStep => html`${VerificationStep(subStep)}`)}`;
  }

  _render ({ subSteps }) {
    if (!subSteps) {
      return null;
    }

    const itemsLength = subSteps.length;
    const itemString = `${itemsLength} Item${itemsLength > 1 ? 's' : ''}`;
    // TODO: better handle this dynamic class (cf npm classnames)
    const linkClasses = [
      'buv-o-small-text',
      'buv-o-link',
      'buv-c-substeps-list__link',
      this.isOpen ? 'is-open' : ''
    ].join(' ');

    const listClasses = [
      'buv-c-substeps-list__list',
      this.isOpen ? 'is-open' : ''
    ].join(' ');

    return html`
    ${CSS}
    <a title='Toggle open list of substeps' onclick='${this.toggleOpen}' class$='${linkClasses}'>
      ${this.isOpen ? 'Hide' : itemString}
    </a>
    <div class$='${listClasses}' style='max-height: ${this.isOpen ? itemsLength * 25 : 0}px'>
      ${subSteps.map(subStep => html`${VerificationStep(subStep)}`)}
    </div>
    `;
  }
}

export default SubStepsList;
