# ADR 3: Connecting the store to a component

## Context
[pwa-starter-kit](https://github.com/Polymer/pwa-starter-kit) is an example of a Redux application working with Polymer 3. While it serves its purpose, the separation of concerns is not entirely clear between the state and the views, which means that in the example views have too much knowledge of what provides and modfies the state.

This is potentially dangerous for scalability, and bloats the view code with decisions that shouldn't be of its concerns.

React provides an architectural pattern to handle this abstraction, in the shape of `Containers`. Containers are wrapper around the view component, which connect (via the `react-redux` helper function of the same name) the view and the state (to read it, and to action it). 

This pattern is interesting because from an architectural standpoint every responsibility is properly distributed. The view receives props, may they be data or callback functions, and utilizes them, the container selects where to retrieve the data or callback functions, and the state solely stores the data and provide mechanisms to modify it.
 
## Decision
We decided to keep this approach for a Polymer project too. Because the out-of-the-box tools do not provide that abstraction, we implemented our own architectural approach to fit this need.

A visual representation of the intent is as follows:
![Chain of connection: State > Connector > Container > Component](https://user-images.githubusercontent.com/12797962/41294972-a254d432-6e59-11e8-8e08-214c43772173.png)
 
- The state handles the live data of the application.
- The connector has an instantiation of the store, but is also a metaview, which enables communication with the methods of the store, without exposing it elsewhere.
- The container is an instance of the connector, which allows defining which part of the state and which actions we would like to bind to its wrapped component.
- And the wrapped component is just a regular component which expects some props, but does not know nor care where they come from.

## Status
 Accepted
 
## Consequences
Implementation of components that need to access the state must follow this pattern.

There are 2 types of components in Polymer, pure functions and classes (extending `LitElement`).
The implementation of this approach differs a little bit, due to technical constraints of LitElement.

Example of a pure function:

**Component**

```javascript
const Input = ({ onInput = () => {} } = {}) => {
  return html`
    <label 
      for='input'>Label for input</label>
    <input 
      type='text'
      id='input'
      on-input='${(e) => { onInput(e.target.value); }}'
    />
  `;
};

export default Input;
```
**Container**

```javascript
import foo from '../../../actions/foo';
import connector from '../../../store/connector';
import Input from './Input';

const mapDispatchToProps = {
  onInput: foo
};

const InputContainer = connector(Input, { mapDispatchToProps });
export { InputContainer };
```

Example of a class component:

**Component**
```javascript
class Button extends LitElement {
  static get properties () {
    return {
      onClick: Function
    };
  }

  _render (_props) {
    return html`
      <button on-click='${_props.onClick}'>
       Label
      </button>
    `;
  }
}

window.customElements.define('buv-verify-button-raw', Button);

// wrap VerifyButton in order to plug into Container
// necessary trade-off to deal with class component in the store connector
function ButtonWrapper (props) {
  return html`<buv-verify-button-raw onClick='${props.onClick}'></buv-verify-button-raw>`;
}

export { ButtonWrapper as Button };
```
We need to encapsulate the button (that we need to define as a reusable component for this purpose) into a pure function, in order to simplify the rendering of the connector. This function is then exported and reused in the container. 

**Container**

```javascript
import bar from '../../../actions/bar';
import connector from '../../../store/connector';
import { Button } from './Button';

const mapDispatchToProps = {
  onClick: bar
};

const VerifyButtonContainer = connector(Button, { mapDispatchToProps });
export { VerifyButtonContainer };
```
Encapsulating the wrapping function inside the component allows for containers to always follow the same pattern and improves expectability.

#### mapping actions to a component
use `mapDispatchToProps`.
It should be an object expect the key (prop that is going to be passed down to the component), and the value should be the action creator to be mapped. See above example for more details.

#### mapping state to a component
use `mapStateToProps`.
It should be a function taking `state` as a parameter, and returning an object with as the key the prop that is going to be passed down to the component, and as a value the selector method reading the state.

```javascript
import connector from '../../../store/connector';
import Input from './Input';
import { foo } from '../../../selectors/foo';

const mapStateToProps = (state) => ({
  isValid: foo(state)
});

const InputContainer = connector(Input, { mapStateToProps });
export { InputContainer };

```

#### exposing the component own props
use `ownProps`. 
Sometimes you want to be able to pass the props from where you use the component directly.
In the case of a connected component, this is not as straightforward as expected.
In order to do so, you need to map the `ownProps` object to the component's actual properties.

In practice, this means exposing your component as `SourceComponent`, and matching `ownProps` to `SourceComponents.properties`.

ie:
```javascript
export {
  BlockcertsVerifier as SourceComponent,
  BUVWrapper as BlockcertsVerifier
};
```

and in the container:

```javascript
import connector from '../store/connector';
import { BlockcertsVerifier, SourceComponent } from './BlockcertsVerifier';

const ownProps = SourceComponent.properties;

const BlockcertsVerifierContainer = connector(BlockcertsVerifier, { ownProps });
export { BlockcertsVerifierContainer };

```

