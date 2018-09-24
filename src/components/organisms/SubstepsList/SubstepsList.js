import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.substeps-list-css';
import VerificationStep from '../../molecules/VerificationStep';

class SubstepsList extends LitElement {
  constructor () {
    super();
    this.isOpen = false;

    // 2 properties below are a trick to manage the force opening without triggering contempt from LitElement
    // one allows us to know we have forced an opening
    // the second one allows us to make sure isOpen is at the correct state.
    // We can't modify isOpen directly otherwise we get console poluted with warnings.
    this.wasForcedOpen = false;
    this.resetOpen = false;
    this.toggleOpen = this.toggleOpen.bind(this);
    // when we force open, we don't have access to the initial height, so we are forcing it onto the list after
    // its first render. We only want to do this once in the lifecycle. See ADR-005.
    this.totalHeight = 0;
    this.heightWasReset = false;
  }

  static get properties () {
    return {
      subSteps: [],
      isOpen: Boolean,
      hasError: Boolean
    };
  }

  toggleOpen () {
    if (this.wasForcedOpen && !this.resetOpen) {
      this.isOpen = true;
      this.resetOpen = true;
    }
    this.isOpen = !this.isOpen;
  }

  _didRender () {
    if (!this.totalHeight) {
      const listParent = this.shadowRoot.querySelectorAll('.buv-js-substeps-list__list')[0];
      const listElements = listParent ? Array.from(listParent.childNodes) : [];
      this.totalHeight = listElements.reduce((acc, element) => {
        if (element.getBoundingClientRect) {
          return acc + element.getBoundingClientRect().height;
        }
        return acc;
      }, 0);

      if (this.wasForcedOpen && !this.heightWasReset) {
        // only do it once.
        listParent.style.maxHeight = this.totalHeight + 'px';
        this.heightWasReset = true;
      }
    }
  }

  _render ({ subSteps, hasError }) {
    if (!subSteps) {
      return null;
    }

    let isOpen = this.isOpen;

    if (!this.wasForcedOpen && hasError) {
      isOpen = true;
      this.wasForcedOpen = true;
    }

    const renderedSubSteps = subSteps.filter(subStep => subStep.status);
    const itemsLength = renderedSubSteps.length;
    const itemString = `${itemsLength} Item${itemsLength > 1 ? 's' : ''}`;
    // we are setting the closing height to 1px so that we can trigger a closing action on the first click on hide button.
    const maxHeight = isOpen ? this.totalHeight : 1;

    // TODO: better handle this dynamic class (cf npm classnames)
    const linkClasses = [
      'buv-o-text-12',
      'buv-o-link',
      'buv-c-substeps-list__link',
      isOpen ? 'is-open' : ''
    ].join(' ');

    const listClasses = [
      'buv-c-substeps-list__list',
      'buv-js-substeps-list__list',
      isOpen ? 'is-open' : ''
    ].join(' ');

    return html`
    ${CSS}
    <a title='Toggle open list of substeps' onclick='${this.toggleOpen}' class$='${linkClasses}'>
      <span class='buv-o-link__text--underline'>${isOpen ? 'Hide' : itemString}</span>
    </a>
    <div class$='${listClasses}' style$='max-height: ${maxHeight}px'>
      ${renderedSubSteps.map(subStep => html`${VerificationStep(subStep)}`)}
    </div>
    `;
  }
}

export default SubstepsList;
