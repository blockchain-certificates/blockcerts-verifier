import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.substeps-list-css';
import VerificationStep from '../../molecules/VerificationStep';
import getText from '../../../i18n/getText';
import type { TemplateResult } from 'lit-html';
import type { IVerificationMapItemSuite, VerificationSubstep } from '@blockcerts/cert-verifier-js';

class SubstepsList extends LitElement {
  isOpen: boolean;
  wasForcedOpen: boolean;
  resetOpen: boolean;
  totalHeight: number;
  heightWasReset: boolean;
  isNested: boolean; // if the list is nested into another one
  hasNestedList: boolean; // if the list is the parent of nested lists
  renderEvent: CustomEvent;

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
    this.hasNestedList = false;
    this.renderEvent = null;
  }

  static get properties (): any {
    return {
      subSteps: [],
      suites: [],
      isOpen: Boolean,
      hasError: Boolean,
      isNested: Boolean
    };
  }

  toggleOpen (): void {
    if (this.wasForcedOpen && !this.resetOpen) {
      this.isOpen = true;
      this.resetOpen = true;
    }
    this.isOpen = !this.isOpen;
  }

  _didRender (): void {
    if (this.totalHeight === 0) {
      const listParent: HTMLElement = this.shadowRoot.querySelectorAll('.buv-js-substeps-list__list')[0] as HTMLElement;
      const listElements: HTMLElement[] = listParent ? Array.from(listParent.childNodes) as HTMLElement[] : [];
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
    if (this.isNested && !this.renderEvent) {
      this.renderEvent = new CustomEvent('child-list-rendered', {
        detail: {
          childHeight: this.totalHeight
        },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(this.renderEvent);
    }
  }

  getRenderableSuites (suites): IVerificationMapItemSuite[] {
    if (!suites || !suites.length) {
      return [];
    }

    const renderableSuites = suites
      .filter(suite => suite.subSteps.length > 0) // do not render list with no substeps
      .filter(suite => suite.subSteps.some(subStep => subStep.status)); // do no render list if the substeps were not updated

    if (renderableSuites.length === 0) {
      return [];
    }
    this.hasNestedList = renderableSuites.length > 1;
    this.shadowRoot.addEventListener('child-list-rendered', (e: CustomEvent) => {
      this.totalHeight += e.detail.childHeight;
    });
    return renderableSuites;
  }

  renderSuiteTitle (suite, renderableSuites): TemplateResult {
    if (renderableSuites.length === 1) {
      // if there is only one suite we merge the substeps with the main substeps
      return null;
    }
    return html`<dt class='buv-o-text-12 buv-o-text-bold'>Proof type: ${suite.proofType}</dt>`;
  }

  renderSuites (renderableSuites, hasError): TemplateResult[] {
    if (!renderableSuites) {
      return;
    }
    return renderableSuites
      .map(suite => {
        return html`
            ${this.renderSuiteTitle(suite, renderableSuites)}
            <buv-substeps-list subSteps='${suite.subSteps}' hasError?='${hasError}' isNested?='${true}'></buv-substeps-list>`;
      });
  }

  _render ({ subSteps = [], suites = [], hasError = false, isNested = false } = {}): TemplateResult {
    let renderableSubsteps = JSON.parse(JSON.stringify(subSteps));
    let renderableSuites = this.getRenderableSuites(suites);

    if (renderableSuites.length === 1) {
      const originalSubsteps = JSON.parse(JSON.stringify(renderableSubsteps));
      renderableSubsteps = originalSubsteps.concat(renderableSuites[0].subSteps);
      renderableSuites = null; // render suite only once
    }

    this.isNested = isNested;

    if (!this.wasForcedOpen && hasError) {
      this.isOpen = true;
      this.wasForcedOpen = true;
    }

    const renderedSubSteps = renderableSubsteps.filter(subStep => subStep.status);
    const itemsLength: number = renderedSubSteps.length || renderableSuites.length;

    if (itemsLength === 0) {
      return null;
    }
    // TODO: translate with plural Item
    const itemString = `${itemsLength} ${getText('text', 'item', true, itemsLength)}`;
    // we are setting the closing height to 1px so that we can trigger a closing action on the first click on hide button.
    const maxHeight = this.isOpen ? this.totalHeight : 1;

    // TODO: better handle this dynamic class (cf npm classnames)
    const linkClasses = [
      'buv-o-text-12',
      'buv-o-link',
      'buv-c-substeps-list__link',
      this.isOpen ? 'is-open' : ''
    ].join(' ');

    const listClasses = [
      'buv-c-substeps-list__list',
      'buv-js-substeps-list__list',
      this.isOpen ? 'is-open' : '',
      this.hasNestedList ? 'is-nested' : ''
    ].join(' ');

    return html`
    ${CSS}
    <a title='${getText('text.substepsListHint')}' onclick='${this.toggleOpen}' class$='${linkClasses}'>
      <span class='buv-o-link__text--underline'>${this.isOpen ? getText('text.substepsListClose') : itemString}</span>
    </a>
    <div class$='${listClasses}' style$='max-height: ${maxHeight}px'>
      ${renderedSubSteps.map(subStep => html`${VerificationStep(subStep)}`)} 
      ${this.renderSuites(renderableSuites, hasError)}
    </div>
    `;
  }
}

export default SubstepsList;
