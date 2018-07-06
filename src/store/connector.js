import { html, LitElement } from '@polymer/lit-element/lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { bindActionCreators } from 'redux';
import { configureStore } from './index';

const store = configureStore();

export default function connector (component, { mapDispatchToProps = {}, mapStateToProps = () => {}, ownProps = {} }) {
  return class extends connect(store)(LitElement) {
    mapDispatchToProps () {
      return bindActionCreators(mapDispatchToProps, store.dispatch);
    }

    mapStateToProps () {
      return mapStateToProps(store.getState());
    }

    static get properties () {
      return ownProps;
    }

    _render (_props) {
      const componentProps = {
        ...this.mapDispatchToProps(),
        ...this.mapStateToProps(),
        ..._props
      };

      return html`${component(componentProps)}`;
    }

    _stateChanged (state) {
      this._requestRender();
    }
  };
}
