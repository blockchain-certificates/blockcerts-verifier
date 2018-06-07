# ADR 2: Understanding the CSS structure

## Context
 Web Components encapsulate their shadow dom away from the rest of the DOM, meaning that a general stylesheet cannot style the internals of a Web Component.
 
 As such, we need to find a strategy to maintain component level styles but enable shared styles so that we limit code duplication.
 
 We had previously decided to follow ITCSS for its way to enable scalability as well as limit specificity war, and would like to keep following this approach.
 
 ## Exploration
 Using a general stylesheet is by essence out of the way.
 
 Using `css-variables` cannot work as not all the problems that it solves are based on variables. Indeed we need to be able to apply blocks of styles in some cases, and maintaining a variable API for each component might lead to insanity.
 
 [@apply](https://tabatkins.github.io/specs/css-apply-rule/) seemed promising, but the proposal has been discontinued, and its replacements (see [ShadyCSS Readme](https://github.com/webcomponents/shadycss/blob/master/README.md#about-applyshim)) are still in proposal stage and might not become the standard. 
 
 Finally it seems that the only option in front of us is to embed styles per component.
 
 ## Decision
 Considering the outcome of the exploration, and seeing that we want to maintain a sense of scalability and separation of concerns as advocated by the ITCSS methodology, we have decided to maintain component specific stylesheets at component directory level, and use Sass `import` within these sheets to add specific classes that many component might use (basically any other layer from ITCSS beyond components).
 
 Shared styles will be hosted under `src/shared-styles` folder and organized following the ITCSS nomenclature.
 
 At this moment the `main.scss` file is maintained as it contains information around the available files, and may prove worthy in the future. The value of this needs to be reassessed.
 
 ## Status
 Accepted
 
 ## Consequences
 We are using [wc-sass-render](https://github.com/tristanMatthias/wc-sass-render) instead of our initial in-house solution, as it solves the exact problem we are facing, and provides the options we need.
 
 CSS files under the components need to follow ITCSS convention in terms of naming, in order to better highlight their layer in the inverted triangle concepts.
 
 Code duplication has been accepted as tech-debt, and might incur solutions to better handle large imports (such as tree-shaking, file splitting, etc).  
 
 