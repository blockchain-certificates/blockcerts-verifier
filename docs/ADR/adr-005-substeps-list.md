# ADR 5: Substeps List size calculation

## Context
 SubstepsList needs to be animated between showing and hiding the substeps of a step.
 Animating proves convenient on `max-height`
 We were initially hard coding the `max-height` property of the substeps list to have a maximum to animate too (from 0).
 However, hard-coding that value proved not flexible, especially when the substep was also holding an `ErrorMessage`, which could span an undeterminate height (multiple lines, responsiveness, etc).
 
 The height of the list all determines the height of the progress bar which at this point is settled and working with little work. 
 
 ## Exploration
 Not many options are available to make sure we can pre-calculate the dynamic, correct, potential `max-height` of the list.
 
 - One way could be render the list somewhere on the DOM, hidden, in order to retrieve its height. However this proves problematic as we need to do a prerender which means complicating the DOM and the application code.
 - Another solution is to read the height of the list element once it has been rendered, and maintain it locally within the parent class. It is not super elegant as we need to overwrite the style property after rendering. 
 
 ## Decision
 We chose to follow the second approach which requires less code to work. It is however creating issues with the `html` templating function of `lit-element`, since we change the state of the attribute without informing the library.
 Doing the latter would mean re-rendering via a state prop which would have to be updated at the `_didRender` moment, and would create complains from Polymer.
 
 We thus decided to trick the component:
 - we only calculate the `totalHeight` once, since content will not change once rendered.
 - we only force the `max-height` with the calculated height once, if the component was forced rendered and if we haven't applied the trick already
 
 We discovered that it would then require 3 clicks on the `hide` button to finally close the list. Some research led us to discover that the `html` templating function handles the values of the attributes, and does not trigger a change (cf: https://github.com/Polymer/lit-html/blob/master/src/core.ts#L538). As such, in the state of the code, the active value is `0` and not `[totalHeight]px` as we forced it to be. Since the closing value is 0 too, the code didn't see the reason for the change.
 
 To circumvent this issue, we are now setting the `hidden` state value to be 1px, which allows for the initial closing.

 ## Status
 Accepted
 
 ## Consequences
 It is not a very elegant hack, but it seems the least aggressive for the browser.
 You should avoid such approaches if you can, though. 
 