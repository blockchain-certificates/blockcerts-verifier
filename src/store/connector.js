import { html, LitElement } from '@polymer/lit-element/lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { bindActionCreators } from 'redux';
import { configureStore } from './index';

const store = configureStore();

export default function connector (component, { mapDispatchToProps = {}, mapStateToProps = () => {} }) {
  return class extends connect(store)(LitElement) {
    mapDispatchToProps () {
      return bindActionCreators(mapDispatchToProps, store.dispatch);
    }

    mapStateToProps () {
      return mapStateToProps(store.getState());
    }

    _render () {
      const props = {
        ...this.mapDispatchToProps(),
        ...this.mapStateToProps()
      };

      return html`${component(props)}`;
    }

    _stateChanged (state) {
      this._render();
    }
  };
}
