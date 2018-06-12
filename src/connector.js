import { html, LitElement } from '@polymer/lit-element/lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { bindActionCreators } from 'redux';
import { configureStore } from './store';

const store = configureStore();

export default function connector(component, { mapDispatchToProps }) {
  return class extends connect(store)(LitElement) {
    mapDispatchToProps () {
      return bindActionCreators(mapDispatchToProps, store.dispatch);
    }

    _render () {
      return html`${component(this.mapDispatchToProps())}`;
    }

    _stateChanged () {

    }
  }
}
