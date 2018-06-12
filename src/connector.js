import { html, LitElement } from '@polymer/lit-element/lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { configureStore } from './store';

const store = configureStore();

// from redux https://github.com/reduxjs/redux/blob/87071fd4ab71acc4fdd8b3db37d2d7ff08b724a3/src/bindActionCreators.js
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}

export default function connector(component, { mapDispatchToProps }) {
  return class extends connect(store)(LitElement) {
    mapDispatchToProps () {
      return Object.keys(mapDispatchToProps).reduce((acc, curr) => {
        acc[curr] = bindActionCreator(mapDispatchToProps[curr], store.dispatch);
        return acc;
      }, {});
    }

    _render () {
      return html`${component(this.mapDispatchToProps())}`;
    }

    _stateChanged () {

    }
  }
}
