import { html, LitElement } from '@polymer/lit-element/lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { bindActionCreators } from 'redux';
import { configureStore } from './index';
import type { TemplateResult } from 'lit-html';
import { BlockcertsVerifierState } from './getInitialState';

const store = configureStore();

interface IConnectorStateParameter<DP, SP, OP> {
  mapDispatchToProps?: DP;
  mapStateToProps?: (state: any, ownProps?: any) => SP; // TODO: define state shape
  ownProps?: OP;
}

export default function connector<DP, SP, OP > (
  component: (props: any) => TemplateResult,
  { mapDispatchToProps = ({} as any), mapStateToProps = (): any => ({} as any), ownProps = ({} as any) }: IConnectorStateParameter<DP, SP, OP>
): new () => any {
  return class extends connect(store)(LitElement) {
    mapDispatchToProps (): DP {
      return bindActionCreators<DP, any>(mapDispatchToProps, store.dispatch);
    }

    mapStateToProps (componentProps: any): SP {
      return mapStateToProps(store.getState(), componentProps);
    }

    static get properties (): OP {
      return ownProps;
    }

    _render (_props: any): TemplateResult {
      const componentProps = {
        ...this.mapDispatchToProps(),
        ...this.mapStateToProps(_props),
        ..._props
      };

      return html`${component(componentProps)}`;
    }

    _stateChanged (state: BlockcertsVerifierState): void {
      this._requestRender();
    }
  };
}
