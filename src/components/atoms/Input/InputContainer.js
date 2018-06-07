import { html, LitElement } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { configureStore } from '../../../store';
import updateCertificateUrl from '../../../actions/updateCertificateUrl';
import Input from './Input';

const store = configureStore();

export class InputContainer extends connect(store)(LitElement) {
  handleInput (e) {
    store.dispatch(updateCertificateUrl(e.target.value));
  }

  _render () {
    return html`${Input({ onInput: this.handleInput })}`
  }

  _stateChanged () {

  }
}
